import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { FaSearch } from "react-icons/fa";
import L from "leaflet";

const OpenRouteServiceAPIKey = "5b3ce3597851110001cf6248ea161ad8474a473891318c69b7978604";

const Map = ({ endCoords, onClose }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [temporaryEndCoords, setTemporaryEndCoords] = useState(endCoords);
  const mapRef = useRef();

  // Define marker icons with sizes
  const userMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const endMarkerIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const fetchRoute = async (startCoords, endCoords) => {
    try {
      const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
          start: `${startCoords[1]},${startCoords[0]}`,
          end: `${endCoords[1]},${endCoords[0]}`
        },
        headers: {
          'Authorization': OpenRouteServiceAPIKey,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.features && response.data.features.length > 0) {
        const route = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRouteCoordinates(route);
      } else {
        setError("No route found.");
      }
    } catch (error) {
      setError("Error fetching route: " + error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    setError(null);
    setRouteCoordinates([]); // Clear previous route

    try {
      const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: {
          api_key: OpenRouteServiceAPIKey,
          text: search
        }
      });

      if (response.data.features && response.data.features.length > 0) {
        const { geometry: { coordinates } } = response.data.features[0];
        const searchLocation = [coordinates[1], coordinates[0]];
        setTemporaryEndCoords(searchLocation); // Set temporary end coordinates
        mapRef.current.setView(searchLocation, 13);
      } else {
        setError("Location not found.");
      }
    } catch (err) {
      setError("Error fetching location: " + err.message);
    }
  };

  const resetToOriginalCoords = () => {
    setTemporaryEndCoords(endCoords); // Reset temporary end coordinates to original
  };

  useEffect(() => {
    const watchPosition = navigator.geolocation.watchPosition((position) => {
      const newUserLocation = [position.coords.latitude, position.coords.longitude];
      setUserLocation(newUserLocation);
      if (mapRef.current) {
        mapRef.current.setView(newUserLocation, 13);
      }
    }, (error) => {
      console.error("Error getting user location:", error);
    });

    return () => {
      navigator.geolocation.clearWatch(watchPosition);
    };
  }, []);

  useEffect(() => {
    if (userLocation && temporaryEndCoords) {
      fetchRoute(userLocation, temporaryEndCoords); // Fetch route using user location and temporary end coords
    }
  }, [userLocation, temporaryEndCoords]);

  return (
    <div className="relative h-auto m-1 p-1">
      {/* Close button */}
      

      {/* Map Container */}
      <MapContainer
        center={userLocation || endCoords || [19.076, 72.8777]}
        zoom={13}
        style={{ height: "400px", width: "100%", marginTop: "10px" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="www.openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={userLocation} icon={userMarkerIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {temporaryEndCoords && (
          <Marker position={temporaryEndCoords} icon={endMarkerIcon}>
            <Popup>End Location</Popup>
          </Marker>
        )}
        {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} color="blue" />}
      </MapContainer>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-l-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 flex-grow transition duration-200 w-80"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200">
          <FaSearch />
        </button>
        <button 
          type="button" 
          onClick={resetToOriginalCoords} 
          className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200 ml-2"
        >
          Reset
        </button>
      </form>

      {error && <div className="text-red-500 text-center mt-2"><p>Cannot Find Route for this Location</p></div>}
    </div>
  );
};

export default Map;
