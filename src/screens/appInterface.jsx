import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react"; // Import GPS Icon
import appInterfaceImage from "../assets/img2.jpg";

const LIBRARIES = ["places"];

const AppInterface = () => {
  const fromRef = useRef();
  const destinationRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [address, setAddress] = useState({
    fromAddress: "",
    destinationAddress: "",
  });

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD3GfwiXBfdfmRTjSOxQw5IutdZbsDlizc",
    libraries: LIBRARIES,
  });

  if (!isLoaded) {
    return <div className="text-white">Loading...</div>;
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    fromRef.current.value = "Fetching current location...";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const geocoder = new window.google.maps.Geocoder();
        const latLng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            fromRef.current.value = results[0].formatted_address;
          } else {
            alert("Unable to retrieve address. Please enter manually.");
            fromRef.current.value = "";
          }
        });
      },
      (error) => {
        alert("Error retrieving location: " + error.message);
        fromRef.current.value = "";
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const confirmRide = (e) => {
    e.preventDefault();

    const fromEntered = fromRef.current.value;
    const destinationEntered = destinationRef.current.value;

    const validatedErrors = validations(fromEntered, destinationEntered);

    if (Object.keys(validatedErrors).length > 0) {
      setFormErrors(validatedErrors);
    } else {
      const newAddress = {
        fromAddress: fromEntered,
        destinationAddress: destinationEntered,
      };
      setAddress(newAddress);
      navigate("/locationRoute-page", { state: { address: newAddress } });
    }
  };

  const validations = (from, destination) => {
    let errors = {};
    if (!from) {
      errors.fromError = "Please enter your location";
    }
    if (!destination) {
      errors.destinationError = "Please enter your destination";
    }
    return errors;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between px-4 lg:px-20 space-y-8 lg:space-y-0 bg-black min-h-screen p-8">
      {/* Logo Section */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0">
        <img
          src="src/assets/logo.png"
          alt="Ride Logo"
          className="w-8 h-auto lg:w-10"
        />
      </div>

      <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 lg:ml-5">
        <h2 className="mt-10 text-center text-3xl font-bold text-white">
          Let's start a Ride...
        </h2>

        <form onSubmit={confirmRide} className="mt-10 space-y-6">
          {/* FROM Section */}
          <div>
            <label
              htmlFor="from"
              className="block text-sm font-medium text-white"
            >
              FROM:
            </label>
            <div className="mt-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
              <Autocomplete onPlaceChanged={() => {}}>
                <input
                  placeholder="Start from"
                  id="from"
                  name="from"
                  type="text"
                  ref={fromRef}
                  className="block w-full rounded-md bg-gray-800 text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </Autocomplete>

              {/* Button with GPS Icon */}
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Compass size={22} />
                Use Current Location
              </button>
            </div>
            {formErrors.fromError && (
              <span className="text-red-500">{formErrors.fromError}</span>
            )}
          </div>

          {/* TO Section */}
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-white"
            >
              TO:
            </label>
            <div className="mt-2">
              <Autocomplete onPlaceChanged={() => {}}>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="Choose destination"
                  ref={destinationRef}
                  className="block w-full rounded-md bg-gray-800 text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </Autocomplete>
              {formErrors.destinationError && (
                <span className="text-red-500">
                  {formErrors.destinationError}
                </span>
              )}
            </div>
          </div>

          {/* Confirm Location Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-500 transition duration-300"
          >
            Confirm Location
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0 lg:ml-2.5 flex items-center">
        <img
          src={appInterfaceImage}
          alt="App Interface"
          className="w-full h-auto max-h-[60vh] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default AppInterface;
