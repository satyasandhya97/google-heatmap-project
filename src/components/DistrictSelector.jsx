import React from "react";

export default function DistrictSelector({
    odishaData,
    selectedDistrict,
    setSelectedDistrict,
}) {
    return (
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
    );
}
