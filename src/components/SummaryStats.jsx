import React from "react";

export default function SummaryStats({ summary }) {
    return (
        <div className="flex gap-6 text-sm">
            <div><strong>Confirmed:</strong> {summary.confirmed}</div>
            <div><strong>Active:</strong> {summary.active}</div>
            <div><strong>Recovered:</strong> {summary.recovered}</div>
            <div><strong>Deceased:</strong> {summary.deceased}</div>
        </div>
    );
}
