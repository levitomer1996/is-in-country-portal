import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { api } from "../../../../api/api";

const CreateCountryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    geoJson: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const parsedGeoJson = JSON.parse(formData.geoJson);

      const res = await api.post("/countries/create", {
        name: formData.name,
        code: formData.code,
        geoJson: parsedGeoJson,
      });

      setSuccessMsg("Country added successfully!");
      setFormData({ name: "", code: "", geoJson: "" });
      onSuccess?.(res.data);
    } catch (err) {
      setError("Failed to add country. Make sure GeoJSON is valid.");
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Country
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMsg}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="Code"
          margin="normal"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="GeoJSON (MultiPolygon)"
          margin="normal"
          multiline
          minRows={6}
          value={formData.geoJson}
          onChange={(e) =>
            setFormData({ ...formData, geoJson: e.target.value })
          }
          placeholder='{"type":"MultiPolygon","coordinates":[[[[35.0, 32.0],[35.1,32.0],[35.1,32.1],[35.0,32.1],[35.0,32.0]]]]}'
          required
        />
        <Typography
          variant="caption"
          component="div"
          mt={1}
          sx={{
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            bgcolor: "#f7f7f7",
            p: 1,
            borderRadius: 1,
          }}
        >
          Example:
        </Typography>
        <Typography
          variant="caption"
          component="div"
          mt={1}
          sx={{
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            bgcolor: "#1e1e1e",
            color: "#dcdcdc",
            p: 2,
            borderRadius: 2,
            overflowX: "auto",
          }}
        >
          {`{
  "type": "MultiPolygon",
  "coordinates": [
    [
      [
        [35.0, 32.0],
        [35.1, 32.0],
        [35.1, 32.1],
        [35.0, 32.1],
        [35.0, 32.0]
      ]
    ]
  ]
}`}
        </Typography>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateCountryForm;
