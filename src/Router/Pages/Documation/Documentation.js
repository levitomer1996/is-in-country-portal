import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Section = ({ title, children }) => (
  <Box mb={5}>
    <Typography variant="h5" gutterBottom fontWeight="bold">
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

const CodeBlock = ({ children }) => (
  <Box
    component="pre"
    sx={{
      fontFamily: "monospace",
      backgroundColor: "#f5f5f5",
      p: 2,
      borderRadius: 2,
      overflowX: "auto",
      mt: 1,
      mb: 2,
    }}
  >
    {children}
  </Box>
);

export default function Documentation() {
  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        minHeight: "100vh",
        px: isMobile ? 1 : isTabletOrBelow ? 2 : 4,
        py: 4,
      }}
    >
      <Grid item xs={12} sm={11} md={10} lg={8}>
        <Paper sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}>
          <Stack spacing={5}>
            <Box textAlign="center">
              <Typography
                variant={isMobile ? "h4" : "h3"}
                gutterBottom
                fontWeight="bold"
              >
                isInCountry SDK Documentation
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                A lightweight SDK and API service to determine if a location is
                inside a specific country using GeoJSON polygons.
              </Typography>
            </Box>

            <Section title="Overview">
              <Typography>
                The <strong>isInCountry SDK</strong> allows developers to verify
                if a specific geographic point (latitude/longitude) is located
                inside the boundaries of a country by comparing it with stored
                GeoJSON polygon data. The backend is powered by NestJS and
                MongoDB.
              </Typography>
            </Section>

            <Section title="Features">
              <ul>
                <li>Check if a coordinate is inside a country's borders</li>
                <li>Store and manage polygon or multipolygon GeoJSON data</li>
                <li>Use RESTful API endpoints to interact with the service</li>
                <li>Admin portal with a visual map and testing interface</li>
              </ul>
            </Section>

            <Section title="Key API Endpoints">
              <Typography variant="subtitle1" fontWeight="bold">
                POST /countries/check-location
              </Typography>
              <Typography>
                Check if a given point is inside the specified country's
                polygon.
              </Typography>
              <CodeBlock>
                {'{ "lat": 32.1, "lng": 34.8, "code": "IL" }'}
              </CodeBlock>
              <Typography>Returns:</Typography>
              <CodeBlock>{'{ "inside": true }'}</CodeBlock>

              <Section title="Create Country (POST /countries/create)">
                <Typography variant="subtitle1" fontWeight="bold">
                  POST /countries/create
                </Typography>

                <Typography mb={2}>
                  This endpoint creates a new country in the database using a
                  unique code, country name, and a valid GeoJSON{" "}
                  <code>Polygon</code> or <code>MultiPolygon</code> structure.
                </Typography>

                <Typography mt={2}>
                  <strong>Required fields:</strong>
                </Typography>
                <ul>
                  <li>
                    <code>name</code>: Human-readable country name (e.g.,
                    "Israel")
                  </li>
                  <li>
                    <code>code</code>: Unique identifier (e.g., "IL")
                  </li>
                  <li>
                    <code>geoJson</code>: A valid GeoJSON object with{" "}
                    <code>type</code> and <code>coordinates</code>
                  </li>
                </ul>

                <Typography mt={2} fontWeight="bold">
                  Example Request Body
                </Typography>
                <CodeBlock>{`{
  "name": "Israel",
  "code": "IL",
  "geoJson": {
    "type": "Polygon",
    "coordinates": [
      [
        [35.0, 32.0],
        [35.1, 32.0],
        [35.1, 32.1],
        [35.0, 32.1],
        [35.0, 32.0]
      ]
    ]
  }
}`}</CodeBlock>

                <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                  What Happens Internally
                </Typography>
                <Typography>
                  Once this request is received, the backend NestJS service:
                </Typography>
                <ol>
                  <li>
                    Validates that <code>code</code> is unique in MongoDB
                  </li>
                  <li>
                    Checks the <code>geoJson</code> object structure
                  </li>
                  <li>
                    Uses Mongoose to save the new country document to the{" "}
                    <code>countries</code> collection
                  </li>
                  <li>
                    Returns the full created country document in the response
                  </li>
                </ol>

                <Typography mt={2}>
                  Make sure to **close polygon rings** by repeating the first
                  point at the end and ensure coordinates are in the order of{" "}
                  <code>[longitude, latitude]</code>.
                </Typography>
              </Section>

              <Typography variant="subtitle1" fontWeight="bold" mt={4}>
                GET /countries
              </Typography>
              <Typography>Fetch a list of all stored countries.</Typography>
            </Section>

            <Section title="React Admin Portal">
              <Typography>Available sections:</Typography>
              <ul>
                <li>
                  <strong>Country Management</strong> – View, add, and edit
                  countries
                </li>
                <li>
                  <strong>Location Testing Tool</strong> – Test if a point is
                  inside a country
                </li>
                <li>
                  <strong>Logs</strong> – View recent request logs
                </li>
              </ul>
            </Section>

            <Section title="Android SDK Usage">
              <Typography>
                Use Retrofit to integrate with the API. Make a request with the
                location and country code, and receive a response indicating if
                it's inside.
              </Typography>
            </Section>

            <Section title="Backend (NestJS)">
              <Typography>
                All logic is handled server-side via NestJS services. The SDK
                uses
                <code style={{ margin: "0 4px" }}>
                  @turf/boolean-point-in-polygon
                </code>{" "}
                to check whether a point lies inside a given GeoJSON
                MultiPolygon.
              </Typography>
            </Section>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
