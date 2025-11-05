import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const ZONE_ICONS = {
    red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    orange: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    green: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    default: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

export default function MapContainer({
    coords,
    defaultCenter,
    mapRef,
    setMapRef,
    zoneColor,
    zones,
    selectedDistrict,
}) {
    const [iconOpacity, setIconOpacity] = useState(1);
    const [circleOpacity, setCircleOpacity] = useState(0.3);
    const [circleRadius, setCircleRadius] = useState(25000);

    useEffect(() => {
        if (coords && selectedDistrict) {
            let visible = true;

            const blinkInterval = setInterval(() => {
                visible = !visible;

                setIconOpacity(visible ? 1 : 0.3);

                setCircleOpacity(visible ? 0.45 : 0.15);
                setCircleRadius(visible ? 27000 : 23000);
            }, 300);

            const stopTimeout = setTimeout(() => {
                clearInterval(blinkInterval);
                setIconOpacity(1);
                setCircleOpacity(0.3);
                setCircleRadius(25000);
            }, 10000);

            return () => {
                clearInterval(blinkInterval);
                clearTimeout(stopTimeout);
            };
        }
    }, [selectedDistrict, coords]);

    const zone = zones[selectedDistrict];
    const iconUrl = ZONE_ICONS[zone] || ZONE_ICONS.default;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords || defaultCenter}
            zoom={7}
            onLoad={(map) => setMapRef(map)}
        >
            {coords && (
                <Circle
                    center={coords}
                    radius={circleRadius}
                    options={{
                        fillColor: zoneColor(zone),
                        fillOpacity: circleOpacity,
                        strokeColor: zoneColor(zone),
                        strokeWeight: 2,
                    }}
                />
            )}

            {coords && (
                <Marker
                    position={coords}
                    icon={{
                        url: iconUrl,
                        scaledSize: new window.google.maps.Size(50, 50),
                        opacity: iconOpacity,
                    }}
                />
            )}
        </GoogleMap>
    );
}
