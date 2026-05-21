import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        
        <h1 className="text-7xl font-bold text-red-500 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/">
          <button
            className="
              w-full
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              duration-300
            "
          >
            Go Back Home
          </button>
        </Link>

      </div>

    </div>
  );
}

export default ErrorPage;