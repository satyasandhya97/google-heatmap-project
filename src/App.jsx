import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Circle } from "@react-google-maps/api";
import odishaData from "./data/odisha.json";

const ZOOM_LEVEL = 10;

const containerStyle = {
  width: "100%",
  height: "500px",
};
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

          const randomZone = ["green", "orange", "red"][
            Math.floor(Math.random() * 3)
          ];
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
  const zoneColor = (zone) => ZONE_COLORS[zone] || "#888";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Odisha District Heatmap
        </h1>

        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex gap-6">
            <div className="text-green-700 font-medium">
              Green Zone
              <div className="w-5 h-5 bg-green-600 rounded-full mt-1"></div>
            </div>
            <div className="text-yellow-600 font-medium">
              Orange Zone
              <div className="w-5 h-5 bg-yellow-500 rounded-full mt-1"></div>
            </div>
            <div className="text-red-600 font-medium">
              Red Zone
              <div className="w-5 h-5 bg-red-600 rounded-full mt-1"></div>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <strong>Confirmed:</strong> {summary.confirmed}
            </div>
            <div>
              <strong>Active:</strong> {summary.active}
            </div>
            <div>
              <strong>Recovered:</strong> {summary.recovered}
            </div>
            <div>
              <strong>Deceased:</strong> {summary.deceased}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              value={odishaData.country}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              value={odishaData.state}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              className="w-full border rounded p-2"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              {odishaData.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords || defaultCenter}
            zoom={7}
            onLoad={(map) => setMapRef(map)}
          >
            {coords && (
              <Circle
                center={coords}
                radius={25000}
                options={{
                  fillColor: zoneColor(zones[selectedDistrict]),
                  fillOpacity: 0.4,
                  strokeColor: strokeColor,
                  strokeWeight: isBlinking ? 5 : 2,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        {coords && (
          <div
            className={`mt-6 border p-4 rounded-md text-sm bg-opacity-10 ${zones[selectedDistrict] === "red"
              ? "bg-red-100 border-red-400"
              : zones[selectedDistrict] === "orange"
                ? "bg-yellow-100 border-yellow-400"
                : "bg-green-100 border-green-400"
              }`}
          >
            <p>
              <strong>District:</strong> {selectedDistrict}
            </p>
            <p>
              <strong>Latitude:</strong> {coords.lat.toFixed(4)} |{" "}
              <strong>Longitude:</strong> {coords.lng.toFixed(4)}
            </p>
            <p>
              <strong>Zone:</strong>{" "}
              <span className="uppercase font-semibold">
                {zones[selectedDistrict]}
              </span>
            </p>
          </div>
        )}
      </div>
    </div >
  );
}
