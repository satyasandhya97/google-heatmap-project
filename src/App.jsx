import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LocationMap from "./pages/LocationMap";
import OdishaHeatmap from "./pages/OdishaHeatmap";


export default function App() {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-3 flex gap-4">
        <Link to="/home">Home</Link>
        <Link to="/location">Location Heatmap</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<OdishaHeatmap />}
        />
        <Route path="/home" element={<OdishaHeatmap />} />
        <Route path="/location" element={<LocationMap />} />
      </Routes>

    </div>
  );
}
