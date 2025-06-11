import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CountryMap = ({ geoJson }) => {
  return (
    <MapContainer
      center={[32.1, 34.8]} // fallback center
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geoJson} />
    </MapContainer>
  );
};

export default CountryMap;
