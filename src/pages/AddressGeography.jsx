
import React, { useState } from "react";
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

    if (name === "country") {
      setForm({
        ...form,
        country: value,
        state: "",
        city: "",
      });
    } else if (name === "state") {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Address & Geography
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your registered headquarters details
        </p>

        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Street Address
          </label>

          <input
            type="text"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="e.g. 123 Innovation Drive"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Apartment / Suite (Optional)
          </label>

          <input
            type="text"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            placeholder="Apartment / Suite"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country / Region
            </label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State / Province
            </label>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>

              {statesData[form.country]?.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>

            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>

              {citiesData[form.country]?.[form.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ZIP / Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              maxLength={10}
              placeholder="Enter postal code"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        
        <div className="flex gap-4 mt-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AddressGeography;

