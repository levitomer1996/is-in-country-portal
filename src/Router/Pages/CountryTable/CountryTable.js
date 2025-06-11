import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { api } from "../../../api/api";
import CountryMap from "../../../components/CountryMap";
import CreateCountryForm from "./components/CreateCountryForm";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/countries")
      .then((res) => {
        setCountries(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching countries:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <CreateCountryForm
        onSuccess={(newCountry) => setCountries([...countries, newCountry])}
      />
      <Typography variant="h4" gutterBottom>
        Country List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Code</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countries.map((country) => (
                  <TableRow
                    key={country._id || country.code}
                    hover
                    onClick={() =>
                      setSelectedCountry(
                        selectedCountry?.code === country.code ? null : country
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedCountry?.code === country.code
                          ? "#f0f0f0"
                          : "inherit",
                    }}
                  >
                    <TableCell>{country.name}</TableCell>
                    <TableCell>{country.code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedCountry && (
            <>
              <Typography variant="h6" mb={2}>
                Selected Country: {selectedCountry.name} ({selectedCountry.code}
                )
              </Typography>
              <CountryMap
                geoJson={{
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: selectedCountry.geoJson,
                      properties: {
                        name: selectedCountry.name,
                        code: selectedCountry.code,
                      },
                    },
                  ],
                }}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CountryTable;
