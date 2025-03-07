import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rideDetails } = location.state || {};
  const {
    vehicleType,
    vehicleCost,
    distance,
    fromAddress,
    destinationAddress,
  } = rideDetails || {};

  const [isBooked, setIsBooked] = useState(false);

  if (!rideDetails || !vehicleType) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error: No vehicle information found.
      </div>
    );
  }

  const handleCashPayment = () => {
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            🎉 Successfully Booked Ride!
          </h1>
          <p className="text-gray-700 mb-4">
            Your ride from <strong>{fromAddress.split(",")[0]}</strong> to{" "}
            <strong>{destinationAddress.split(",")[0]}</strong> is confirmed.
          </p>
          <a href="/" className="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 relative">
        {/* Header Section: Back Button and Vehicle Payment */}
        <div className="absolute top-4 left-4">
          {/* Back Button (Left) */}
          <button
          onClick={() => navigate("/app-interface")}
          className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
           ← Back
         </button>
       </div>

        {/* Vehicle Payment Heading (Left Aligned) */}
        <header className="flex justify-center items-center mt-10 mb-8">
          <h1 className="text-2xl font-bold">🚗 Vehicle Payment</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Vehicle Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
            <div className="space-y-4">
              <p>
                <span className="font-medium">Type:</span> {vehicleType}
              </p>
              <p>
                <span className="font-medium">Cost:</span> {vehicleCost}
              </p>
              <p>
                <span className="font-medium">Distance:</span> {distance} km
              </p>
              <p>
                <span className="font-medium">From:</span> {fromAddress}
              </p>
              <p>
                <span className="font-medium">To:</span> {destinationAddress}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Scan to Pay</h3>
              <img
                src="src/assets/Qrcode.jpg"
                alt="QR Code"
                className="w-48 h-48 rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Right Section - Payment Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Vehicle Cost:</span>
                <span>{vehicleCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance Responsibility:</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Patient Balance:</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>{vehicleCost}</span>
            </div>

            <button
              onClick={handleCashPayment}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Cash Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
