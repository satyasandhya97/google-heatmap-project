import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import odishaData from "./data/odisha.json";
import MapContainer from "./components/MapContainer";
import ZoneLegend from "./components/ZoneLegend";
import SummaryStats from "./components/SummaryStats";
import DistrictSelector from "./components/DistrictSelector";
import DistrictInfo from "./components/DistrictInfo";

const ZOOM_LEVEL = 10;

const defaultCenter = { lat: 20.2961, lng: 85.8245 };
const ZONE_COLORS = {
  red: "#FF0000",
  orange: "#FFA500",
  green: "#00CC66",
};

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("Boudh");
  const [coords, setCoords] = useState(null);
  const [zones, setZones] = useState({});
  const [summary, setSummary] = useState({
    confirmed: 128,
    active: 88,
    recovered: 39,
    deceased: 1,
  });
  const [mapRef, setMapRef] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#0000FF");

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const zoneColor = (zone) => ZONE_COLORS[zone] || "#888";

  useEffect(() => {
    if (selectedDistrict) {
      const fetchGeo = async () => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${selectedDistrict},Odisha,India`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setCoords(newCoords);

          const randomZone = ["green", "orange", "red"][Math.floor(Math.random() * 3)];
          setZones((prev) => ({ ...prev, [selectedDistrict]: randomZone }));

          if (mapRef) {
            mapRef.panTo(newCoords);
            mapRef.setZoom(ZOOM_LEVEL);
          }

          setIsBlinking(true);
          let blinkOn = true;
          const blinkInterval = setInterval(() => {
            blinkOn = !blinkOn;
            setStrokeColor(blinkOn ? "#0000FF" : zoneColor(randomZone));
          }, 500);

          const stopTimeout = setTimeout(() => {
            clearInterval(blinkInterval);
            setIsBlinking(false);
            setStrokeColor(zoneColor(randomZone));
          }, 10000);

          return () => {
            clearInterval(blinkInterval);
            clearTimeout(stopTimeout);
          };
        }
      };
      fetchGeo();
    }
  }, [selectedDistrict]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Odisha District Heatmap
        </h1>

        <div className="flex flex-wrap justify-between items-center mb-6">
          <ZoneLegend />
          <SummaryStats summary={summary} />
        </div>

        <DistrictSelector
          odishaData={odishaData}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />

        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <MapContainer
            coords={coords}
            defaultCenter={defaultCenter}
            mapRef={mapRef}
            setMapRef={setMapRef}
            zoneColor={zoneColor}
            zones={zones}
            selectedDistrict={selectedDistrict}
            strokeColor={strokeColor}
            isBlinking={isBlinking}
          />
        </LoadScript>

        {coords && (
          <DistrictInfo
            coords={coords}
            zones={zones}
            selectedDistrict={selectedDistrict}
          />
        )}
      </div>
    </div>
  );
}
