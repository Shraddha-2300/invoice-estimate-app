import React, { useState } from "react";
import "../styles/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Account() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    mfaEnabled: false,
    phoneNumber: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match ");
      return;
    }

    if (form.mfaEnabled && !form.phoneNumber) {
      toast.error("Phone number required ");
      return;
    }
      console.log(form);
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
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit">Next</button>
      </form>

      <ToastContainer />
    </>
  );
}

export default Account;
