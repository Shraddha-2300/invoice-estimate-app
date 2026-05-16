import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function Review() {
  const navigate = useNavigate();

  const accountData =
    JSON.parse(sessionStorage.getItem("accountData")) || {};

  const businessData =
    JSON.parse(sessionStorage.getItem("businessData")) || {};

  const addressData =
    JSON.parse(sessionStorage.getItem("addressData")) || {};

  const ownersData =
    JSON.parse(sessionStorage.getItem("ownersData")) || [];

  return (
    <div className="review-container">

      <h1>Review & Submit</h1>

      <p>
        Please review all information before final submission.
      </p>

    

      <div className="review-card">

        <div className="review-header">
          <h2>Company Info</h2>

          <button onClick={() => navigate("/business")}>
            Edit
          </button>
        </div>

        <div className="review-content">

          <p>
            <strong>Business Name:</strong>{" "}
            {businessData.businessName}
          </p>

          <p>
            <strong>Entity Type:</strong>{" "}
            {businessData.entityType}
          </p>

          <p>
            <strong>Industry:</strong>{" "}
            {businessData.industry}
          </p>

          <p>
            <strong>Registration Number:</strong>{" "}
            {businessData.registrationNumber}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {businessData.country}
          </p>

          <p>
            <strong>Operating Status:</strong>{" "}
            {businessData.operatingStatus}
          </p>

          <p>
            <strong>Fiscal Year End:</strong>{" "}
            {businessData.fiscalYearEnd}
          </p>

        </div>
      </div>

      

      <div className="review-card">

        <div className="review-header">
          <h2>Account Info</h2>

          <button onClick={() => navigate("/")}>
            Edit
          </button>
        </div>

        <div className="review-content">

          <p>
            <strong>Email:</strong>{" "}
            {accountData.email}
          </p>

          <p>
            <strong>MFA Enabled:</strong>{" "}
            {accountData.mfaEnabled ? "Yes" : "No"}
          </p>

          {accountData.mfaEnabled && (
            <p>
              <strong>Phone:</strong>{" "}
              {accountData.countryCode}{" "}
              {accountData.phoneNumber}
            </p>
          )}

        </div>
      </div>

    

      <div className="review-card">

        <div className="review-header">
          <h2>Address Info</h2>

          <button onClick={() => navigate("/address")}>
            Edit
          </button>
        </div>

        <div className="review-content">

          <p>
            <strong>Street Address:</strong>{" "}
            {addressData.addressLine1}
          </p>

          <p>
            <strong>Apartment / Suite:</strong>{" "}
            {addressData.addressLine2 || "N/A"}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {addressData.country}
          </p>

          <p>
            <strong>State:</strong>{" "}
            {addressData.state}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {addressData.city}
          </p>

          <p>
            <strong>Postal Code:</strong>{" "}
            {addressData.postalCode}
          </p>

        </div>
      </div>

    

      <div className="review-card">

        <div className="review-header">
          <h2>Owners</h2>

          <button onClick={() => navigate("/owners")}>
            Edit
          </button>
        </div>

        <div className="review-content">

          {ownersData.map((owner, index) => (
            <div key={index} className="owner-box">

              <p>
                <strong>Name:</strong>{" "}
                {owner.fullName}
              </p>

              <p>
                <strong>Ownership:</strong>{" "}
                {owner.ownershipPercentage}%
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {owner.dob}
              </p>

              <hr />

            </div>
          ))}

        </div>
      </div>

      <button className="submit-btn">
        Submit Application
      </button>

    </div>
  );
}

export default Review;