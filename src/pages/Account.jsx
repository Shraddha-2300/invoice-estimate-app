import React, { useState } from "react";
import "../styles/style.css";
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>Account Setup</h2>

        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <input
          type="checkbox"
          id="mfaEnabled"
          name="mfaEnabled"
          checked={form.mfaEnabled}
          onChange={handleChange}
        />
        <label htmlFor="mfaEnabled">Enable MFA</label>

        {form.mfaEnabled && (
          <div className="form-group">
            <label className="form-label" htmlFor="phoneNumber">
              Phone Number
            </label>

            <div className="phone-group">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="country-code"
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
              />
            </div>
          </div>
        )}
        <button type="submit">Next</button>
        <button type="button" onClick={() => navigate("/")}>
          Back
        </button>
      </form>

      <ToastContainer />
    </>
  );
}

export default Account;
