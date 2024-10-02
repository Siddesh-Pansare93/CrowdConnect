// src/components/Map.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet for marker customization
import { FaTimes } from "react-icons/fa"; // Importing the X icon

// Replace with your OpenRouteService API key
const OpenRouteServiceAPIKey = "5b3ce3597851110001cf6248ea161ad8474a473891318c69b7978604"; 

const Map = ({ startCoords, endCoords, onClose }) => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [error, setError] = useState(null);

    const fetchRoute = async () => {
        try {
            const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
                params: {
                    start: `${startCoords[1]},${startCoords[0]}`, // [longitude, latitude]
                    end: `${endCoords[1]},${endCoords[0]}`      // [longitude, latitude]
                },
                headers: {
                    'Authorization': OpenRouteServiceAPIKey,
                    'Content-Type': 'application/json'
                }
            });

            console.log("API Response:", response.data); // Debugging log

            // Check if features exist and extract coordinates
            if (response.data.features && response.data.features.length > 0) {
                const route = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRouteCoordinates(route);
            } else {
                setError("No route found.");
            }
        } catch (error) {
            setError("Error fetching route: " + error.message);
            console.error("Error fetching route", error);
        }
    };

    useEffect(() => {
        if (startCoords && endCoords) {
            fetchRoute();
        }
    }, [startCoords, endCoords]);

    // Custom hook to fit bounds
    const FitBounds = ({ startCoords, endCoords, routeCoordinates }) => {
        const map = useMap();

        useEffect(() => {
            if (startCoords && endCoords) {
                const bounds = L.latLngBounds([startCoords, endCoords]);
                map.fitBounds(bounds); // Adjust map view to fit both markers
            }
        }, [map, startCoords, endCoords, routeCoordinates]);

        return null;
    };

    // Custom marker icons
    const startIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', // Start marker URL
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const endIcon = new L.Icon({
        iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png', // End marker URL (Red)
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <div className="relative p-4 bg-white shadow-lg rounded-lg">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-600 transition duration-300"
            >
                <FaTimes size={24} />
            </button>
            {error && <div className="text-red-500 text-center mb-2">{error}</div>}
            <MapContainer center={startCoords} zoom={13} style={{ height: "60vh", width: "100%" }} className="rounded-lg shadow-md">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={startCoords} icon={startIcon}>
                    <Popup>Start Location</Popup>
                </Marker>
                <Marker position={endCoords} icon={endIcon}>
                    <Popup>End Location</Popup>
                </Marker>
                {routeCoordinates.length > 0 && (
                    <Polyline positions={routeCoordinates} color="blue" />
                )}
                <FitBounds startCoords={startCoords} endCoords={endCoords} routeCoordinates={routeCoordinates} />
            </MapContainer>
        </div>
    );
};

export default Map;
