import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem("accountData")) || {
        email: "",
        password: "",
        confirmPassword: "",
        mfaEnabled: false,
        phoneNumber: "",
        countryCode: "+91",
      }
    );
  });

  const countryCodes = [
    { code: "+91", label: "India" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "Australia" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    const phoneRegex = /^[0-9]+$/;

    if (!form.email) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Enter valid email");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number & special character",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.mfaEnabled) {
      if (!form.phoneNumber) {
        toast.error("Phone number required");
        return;
      }

      if (!phoneRegex.test(form.phoneNumber)) {
        toast.error("Phone number must contain only digits");
        return;
      }

      if (form.phoneNumber.length < 10) {
        toast.error("Phone number must be 10 digits");
        return;
      }
    }

    sessionStorage.setItem("accountData", JSON.stringify(form));

    navigate("/business");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Account Setup
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Create your secure business account
        </p>

        
        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="email"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="flex items-center gap-3 mb-5">
          <input
            type="checkbox"
            id="mfaEnabled"
            name="mfaEnabled"
            checked={form.mfaEnabled}
            onChange={handleChange}
            className="h-4 w-4"
          />

          <label htmlFor="mfaEnabled" className="text-gray-700 font-medium">
            Enable MFA Authentication
          </label>
        </div>

        
        {form.mfaEnabled && (
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>

            <div className="flex gap-3">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.label})
                  </option>
                ))}
              </select>

              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/")}
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

export default Account;
