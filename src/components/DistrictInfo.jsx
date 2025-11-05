import React from "react";

export default function DistrictInfo({ coords, zones, selectedDistrict }) {
    return (
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
    );
}
