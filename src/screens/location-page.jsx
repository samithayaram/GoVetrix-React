import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar, FaMotorcycle, FaBicycle, FaTaxi } from "react-icons/fa";

const LocationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef(null);
  const [routeData, setRouteData] = useState(null);
  const [address, setAddress] = useState(location.state?.address || {});
  const [routeDetails, setRouteDetails] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const apiKey = "AIzaSyD3GfwiXBfdfmRTjSOxQw5IutdZbsDlizc"; // Replace with your API key

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!address?.fromAddress || !address?.destinationAddress) return;

    const fetchRoute = async () => {
      const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
      const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      };

      const body = {
        origin: { address: address.fromAddress },
        destination: { address: address.destinationAddress },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "en-US",
        units: "METRIC",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Failed to fetch route data");

        const data = await response.json();
        setRouteData(data);

        fetchGeocode(address.fromAddress, "from");
        fetchGeocode(address.destinationAddress, "to");

        if (data?.routes?.length > 0) {
          const route = data.routes[0];
          const distanceKm = route.distanceMeters / 1000;
          const durationMinutes = Math.ceil(
            parseInt(route.duration.replace("s", "")) / 60
          );

          const vehicleTypes = [
            {
              type: "Premium Car",
              cost: distanceKm * 30 + durationMinutes * 2,
              icon: <FaTaxi />,
              duration: durationMinutes,
            },
            {
              type: "Car",
              cost: distanceKm * 15 + durationMinutes * 1,
              icon: <FaCar />,
              duration: durationMinutes,
            },
            {
              type: "Auto",
              cost: distanceKm * 8 + durationMinutes * 0.5,
              icon: <FaMotorcycle />,
              duration: Math.ceil(durationMinutes * 1.2),
            },
            {
              type: "Bike",
              cost: distanceKm * 5 + durationMinutes * 0.2,
              icon: <FaBicycle />,
              duration: Math.ceil(durationMinutes * 0.8),
            },
          ];

          setRouteDetails({
            distance: distanceKm.toFixed(2),
            duration: durationMinutes,
            vehicleOptions: vehicleTypes.map((v) => ({
              ...v,
              cost: `₹${v.cost.toFixed(2)}`,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    const fetchGeocode = async (addressString, type) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        addressString
      )}&key=${apiKey}`;
      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setAddress((prevAddress) => ({
            ...prevAddress,
            ...(type === "from"
              ? { fromLat: location.lat, fromLng: location.lng }
              : { toLat: location.lat, toLng: location.lng }),
          }));
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    };

    fetchRoute();
  }, [address.fromAddress, address.destinationAddress]);

  const decodePolyline = (encoded) => {
    let points = [],
      index = 0,
      lat = 0,
      lng = 0;
    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };

  const path = routeData?.routes?.[0]?.polyline?.encodedPolyline
    ? decodePolyline(routeData.routes[0].polyline.encodedPolyline)
    : [];

  useEffect(() => {
    if (path.length > 0 && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      path.forEach((point) => bounds.extend(point));
      mapRef.current.fitBounds(bounds);
    }
  }, [path]);

  const handleBookRide = () => {
    if (selectedVehicle) {
      const rideDetails = {
        vehicleType: selectedVehicle.type,
        vehicleCost: selectedVehicle.cost,
        distance: routeDetails.distance,
        duration: routeDetails.duration,
        fromAddress: address.fromAddress,
        destinationAddress: address.destinationAddress,
      };

      navigate("/payment", { state: { rideDetails } });
    } else {
      alert("Please select a vehicle first.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-8">
  <div className="flex flex-col items-center bg-gray-900 p-4 sm:p-8 rounded-2xl shadow-lg w-full max-w-4xl relative">

    {/* Header Section: Back Button and Logo */}
    <div className="absolute top-4 left-4 flex items-center w-full justify-between px-2 sm:px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/app-interface')}
        className="flex items-center gap-2 text-white bg-blue-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300 text-sm sm:text-base"
      >
        ← Back
      </button>

      {/* Centered Logo */}
      <div className="flex-grow flex justify-center">
        <img
          src="src/assets/logo.png"
          alt="Ride Logo"
          className="w-10 sm:w-12 h-auto lg:w-14"
        />
      </div>
    </div>

    {/* Google Map Section with More Space Below the Header */}
    <div className="mt-20 w-full">
      {isLoaded ? (
        <GoogleMap
          onLoad={(map) => (mapRef.current = map)}
          center={{
            lat: address.fromLat || 17.385,
            lng: address.fromLng || 78.4867,
          }}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "300px", sm: { height: "500px" } }}
        >
          {address.fromLat && address.fromLng && (
            <Marker
              position={{ lat: address.fromLat, lng: address.fromLng }}
              label="A"
            />
          )}
          {address.toLat && address.toLng && (
            <Marker
              position={{ lat: address.toLat, lng: address.toLng }}
              label="B"
            />
          )}
          {path.length > 0 && (
            <Polyline
              path={path}
              options={{ strokeColor: "#FF0000", strokeWeight: 4 }}
            />
          )}
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </div>

    {/* Ride Details Section */}
    {routeDetails && (
      <div className="mt-8 w-full">
        <h3 className="text-xl sm:text-2xl mb-4 text-center">Choose Your Ride</h3>
        {routeDetails.vehicleOptions.map((vehicle, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-4 border-b border-gray-700 cursor-pointer ${
              selectedVehicle?.type === vehicle.type ? "bg-gray-800" : ""
            }`}
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="flex items-center gap-4">
              {vehicle.icon}
              <div>
                <div className="font-semibold text-sm sm:text-base">{vehicle.type}</div>
                <div className="text-sm sm:text-base">
                  {routeDetails.distance} km - {vehicle.duration} min
                </div>
              </div>
            </div>
            <div className="font-semibold text-sm sm:text-base">{vehicle.cost}</div>
          </div>
        ))}

        {/* Book Ride Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBookRide}
            className="mt-6 bg-green-600 px-4 sm:px-6 py-2 rounded-lg hover:bg-green-500 transition duration-300 text-sm sm:text-base"
          >
            Book Ride
          </button>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default LocationComponent;
