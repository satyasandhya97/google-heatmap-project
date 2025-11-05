import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import indiaGeoJSON from "../data/in.json";

const odishaDistricts = [
    { name: "Boudh", lat: 20.8377, lng: 84.3265 },
    { name: "Cuttack", lat: 20.4625, lng: 85.8828 },
    { name: "Puri", lat: 19.8135, lng: 85.8312 },
    { name: "Sambalpur", lat: 21.4669, lng: 83.9812 },
];

export default function OdishaHeatmap() {
    const [odishaColor, setOdishaColor] = useState("#e5e7eb");

    const getFillColor = (stateName) => {
        if (stateName === "Odisha") return odishaColor;
        return "#e5e7eb";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
                Odisha State District Heatmap
            </h2>

            <div className="flex space-x-4">
                <button
                    onClick={() => setOdishaColor("#22c55e")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-80"
                >
                    Good
                </button>
                <button
                    onClick={() => setOdishaColor("#eab308")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:opacity-80"
                >
                    Moderate
                </button>
                <button
                    onClick={() => setOdishaColor("#ef4444")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80"
                >
                    Poor
                </button>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [85.5, 20], scale: 4000 }}
                width={1000}
                height={800}
            >
                <Geographies geography={indiaGeoJSON}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const stateName = geo.properties.st_nm;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={getFillColor(stateName)}
                                    stroke="#fff"
                                    strokeWidth={0.4}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#fbbf24", cursor: "pointer" },
                                        pressed: { fill: "#22c55e" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>

                {odishaDistricts.map((district, idx) => (
                    <Marker key={idx} coordinates={[district.lng, district.lat]}>
                        <circle r={6} fill={odishaColor} stroke="#fff" strokeWidth={1.5} />
                        <text
                            textAnchor="middle"
                            y={-10}
                            style={{ fontFamily: "Arial", fontSize: 10 }}
                        >
                            {district.name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
}