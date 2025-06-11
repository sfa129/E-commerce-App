import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
