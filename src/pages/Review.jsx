import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Review() {
  const navigate = useNavigate();

  const accountData = JSON.parse(sessionStorage.getItem("accountData")) || {};

  const businessData = JSON.parse(sessionStorage.getItem("businessData")) || {};

  const addressData = JSON.parse(sessionStorage.getItem("addressData")) || {};

  const ownersData = JSON.parse(sessionStorage.getItem("ownersData")) || [];

  
  const handleSubmit = () => {
    toast.success("Application Submitted Successfully ✅");

    
    sessionStorage.removeItem("accountData");
    sessionStorage.removeItem("businessData");
    sessionStorage.removeItem("addressData");
    sessionStorage.removeItem("ownersData");

    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div
        className="
          max-w-4xl
          mx-auto
          bg-white
          shadow-xl
          rounded-2xl
          p-8
        "
      >
      

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Review & Submit</h1>

          <p className="text-gray-500 mt-2">
            Please review all information before final submission.
          </p>
        </div>

      

        <div className="bg-gray-50 border rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Company Info
            </h2>

            <button
              onClick={() => navigate("/business")}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              Edit
            </button>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Business Name:</strong> {businessData.businessName}
            </p>

            <p>
              <strong>Entity Type:</strong> {businessData.entityType}
            </p>

            <p>
              <strong>Industry:</strong> {businessData.industry}
            </p>

            <p>
              <strong>Registration Number:</strong>{" "}
              {businessData.registrationNumber}
            </p>

            <p>
              <strong>Country:</strong> {businessData.country}
            </p>

            <p>
              <strong>Operating Status:</strong> {businessData.operatingStatus}
            </p>

            <p>
              <strong>Fiscal Year End:</strong> {businessData.fiscalYearEnd}
            </p>
          </div>
        </div>

      

        <div className="bg-gray-50 border rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Account Info
            </h2>

            <button
              onClick={() => navigate("/")}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              Edit
            </button>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Email:</strong> {accountData.email}
            </p>

            <p>
              <strong>MFA Enabled:</strong>{" "}
              {accountData.mfaEnabled ? "Yes" : "No"}
            </p>

            {accountData.mfaEnabled && (
              <p>
                <strong>Phone:</strong> {accountData.countryCode}{" "}
                {accountData.phoneNumber}
              </p>
            )}
          </div>
        </div>

        

        <div className="bg-gray-50 border rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Address Info
            </h2>

            <button
              onClick={() => navigate("/address")}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              Edit
            </button>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Street Address:</strong> {addressData.addressLine1}
            </p>

            <p>
              <strong>Apartment / Suite:</strong>{" "}
              {addressData.addressLine2 || "N/A"}
            </p>

            <p>
              <strong>Country:</strong> {addressData.country}
            </p>

            <p>
              <strong>State:</strong> {addressData.state}
            </p>

            <p>
              <strong>City:</strong> {addressData.city}
            </p>

            <p>
              <strong>Postal Code:</strong> {addressData.postalCode}
            </p>
          </div>
        </div>

        

        <div className="bg-gray-50 border rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Owners</h2>

            <button
              onClick={() => navigate("/owners")}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "
            >
              Edit
            </button>
          </div>

          <div className="space-y-5">
            {ownersData.map((owner, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  rounded-xl
                  p-4
                  shadow-sm
                "
              >
                <p className="mb-2">
                  <strong>Name:</strong> {owner.fullName}
                </p>

                <p className="mb-2">
                  <strong>Ownership:</strong> {owner.ownershipPercentage}%
                </p>

                <p>
                  <strong>Date of Birth:</strong> {owner.dob}
                </p>
              </div>
            ))}
          </div>
        </div>

      

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            py-4
            rounded-xl
            text-lg
            transition
          "
        >
          Submit Application
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Review;
