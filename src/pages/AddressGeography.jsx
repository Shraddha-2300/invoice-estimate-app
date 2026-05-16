import React, { useState } from "react";
import "../styles/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddressGeography() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem("addressData")) || {
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
      }
    );
  });

  const statesData = {
    IN: [
      { code: "MH", name: "Maharashtra" },
      { code: "DL", name: "Delhi" },
      { code: "GJ", name: "Gujarat" },
    ],

    US: [
      { code: "CA", name: "California" },
      { code: "TX", name: "Texas" },
      { code: "FL", name: "Florida" },
    ],
  };

  // Cities based on country + state
  const citiesData = {
    IN: {
      MH: ["Mumbai", "Pune", "Nagpur"],
      DL: ["New Delhi", "Dwarka", "Rohini"],
      GJ: ["Ahmedabad", "Surat", "Vadodara"],
    },

    US: {
      CA: ["Los Angeles", "San Francisco", "San Diego"],
      TX: ["Houston", "Dallas", "Austin"],
      FL: ["Miami", "Orlando", "Tampa"],
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset state + city when country changes
    if (name === "country") {
      setForm({
        ...form,
        country: value,
        state: "",
        city: "",
      });
    }

    // Reset city when state changes
    else if (name === "state") {
      setForm({
        ...form,
        state: value,
        city: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postalRegex = /^[0-9]+$/;

    if (!form.addressLine1.trim()) {
      toast.error("Street address is required");
      return;
    }

    if (form.addressLine1.trim().length < 5) {
      toast.error("Enter valid street address");
      return;
    }

    if (!form.country) {
      toast.error("Select country");
      return;
    }

    if (!form.state) {
      toast.error("Select state");
      return;
    }

    if (!form.city) {
      toast.error("Select city");
      return;
    }

    if (!form.postalCode.trim()) {
      toast.error("Postal code is required");
      return;
    }

    if (!postalRegex.test(form.postalCode)) {
      toast.error("Postal code must contain only numbers");
      return;
    }

    if (form.postalCode.length < 4 || form.postalCode.length > 10) {
      toast.error("Invalid postal code");
      return;
    }

    sessionStorage.setItem("addressData", JSON.stringify(form));

    navigate("/owners");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Address & Geography</h2>

        <h3>Registered Headquarters</h3>

        <label className="form-label" htmlFor="streetaddress">
          Street Address
        </label>

        <input
          type="text"
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          placeholder="e.g. 123 Innovation Drive"
        />

        <label className="form-label" htmlFor="apartmentsuiteunit">
          Apartment, suite, unit (optional)
        </label>

        <input
          type="text"
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          placeholder="Apartment / Suite"
        />

        <label className="form-label" htmlFor="country">
          Country / Region
        </label>

        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">Select</option>
          <option value="IN">India</option>
          <option value="US">United States</option>
        </select>

        <label className="form-label" htmlFor="stateprovince">
          State / Province
        </label>

        <select name="state" value={form.state} onChange={handleChange}>
          <option value="">Select</option>

          {statesData[form.country]?.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="city">
          City
        </label>

        <select name="city" value={form.city} onChange={handleChange}>
          <option value="">Select City</option>

          {citiesData[form.country]?.[form.state]?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="zippostalcode">
          ZIP / Postal Code
        </label>

        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          maxLength={10}
          placeholder="Enter postal code"
        />

        <div className="button-group">
        
          <button type="submit">Next</button>

          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
}

export default AddressGeography;
