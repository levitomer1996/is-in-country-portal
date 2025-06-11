import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { api } from "../../../api/api";

export default function LocationTestTool() {
  const [form, setForm] = useState({ lat: "", lng: "", code: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    const code = form.code.trim().toUpperCase();

    if (isNaN(lat) || isNaN(lng) || !code) {
      setError("Please enter valid latitude, longitude, and country code.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/countries/check-location", {
        lat,
        lng,
        code,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Failed to check coordinates. Make sure input is valid."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
        }));
        setError("");
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Location Testing Tool
        </Typography>
        <Typography variant="body2" gutterBottom>
          Enter latitude, longitude, and the country code to check if the
          coordinates fall within the country's polygon. You can also use your
          current GPS location.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Latitude"
            type="number"
            margin="normal"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Longitude"
            type="number"
            margin="normal"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Country Code (e.g. IL)"
            margin="normal"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Check Location"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleUseMyLocation}
              disabled={loading}
              fullWidth
            >
              Use My Location
            </Button>
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Alert
            severity={result.inside ? "success" : "warning"}
            sx={{ mt: 2 }}
          >
            {result.inside
              ? "✅ The point is inside the country."
              : "❌ The point is outside the country."}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
