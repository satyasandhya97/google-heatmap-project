import React from "react";

export default function ZoneLegend() {
    return (
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
    );
}
