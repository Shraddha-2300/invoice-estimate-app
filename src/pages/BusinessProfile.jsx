import React, { useState } from "react";
import "../styles/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function BusinessProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
  return (
    JSON.parse(sessionStorage.getItem("businessData")) || {
      businessName: "",
      entityType: "",
      industry: "",
      registrationNumber: "",
      country: "",
      operatingStatus: "",
      fiscalYearEnd: "",
    }
  );
});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const businessNameRegex = /^[A-Za-z0-9\s&.,'-]+$/;
    const registrationRegex = /^[A-Za-z0-9-]+$/;

    if (!form.businessName.trim()) {
      toast.error("Business name is required");
      return;
    }

    if (form.businessName.trim().length < 3) {
      toast.error("Business name must be at least 3 characters");
      return;
    }

    if (!businessNameRegex.test(form.businessName)) {
      toast.error("Invalid business name");
      return;
    }

    if (!form.entityType) {
      toast.error("Select entity type");
      return;
    }

    if (!form.industry) {
      toast.error("Select industry");
      return;
    }

    
    if (form.entityType !== "SOLE_PROP") {
      if (!form.registrationNumber.trim()) {
        toast.error("Registration number is required");
        return;
      }

      if (form.registrationNumber.length < 5) {
        toast.error("Invalid registration number");
        return;
      }

      if (!registrationRegex.test(form.registrationNumber)) {
        toast.error(
          "Registration number should contain only letters, numbers or hyphen",
        );
        return;
      }

      if (!form.country) {
        toast.error("Select country");
        return;
      }

      if (!form.operatingStatus) {
        toast.error("Select operating status");
        return;
      }

      if (!form.fiscalYearEnd) {
        toast.error("Select fiscal year end");
        return;
      }
    }
    sessionStorage.setItem("businessData", JSON.stringify(form));
    navigate("/address");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Business Profile</h2>

        <h3>Core Identity</h3>

        <label className="form-label" htmlFor="legalbusinessname">
          Legal Business Name
        </label>

        <input
          type="text"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          placeholder="Enter business name"
        />

        <label className="form-label" htmlFor="entitytype">
          Entity Type
        </label>

        <select
          name="entityType"
          value={form.entityType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="SOLE_PROP">Sole Proprietorship</option>
          <option value="PARTNERSHIP">Partnership</option>
          <option value="LLC">LLC</option>
          <option value="CORP">Corporation</option>
        </select>

        <label className="form-label" htmlFor="industrysector">
          Industry Sector
        </label>

        <select name="industry" value={form.industry} onChange={handleChange}>
          <option value="">Select</option>
          <option value="TECH">Technology</option>
          <option value="FINANCE">Finance</option>
          <option value="HEALTH">Healthcare</option>
        </select>

        {form.entityType !== "SOLE_PROP" && (
          <>
            <label className="form-label" htmlFor="businessregistrationnumber">
              Business Registration Number
            </label>

            <input
              type="text"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              maxLength={20}
              placeholder="Enter registration number"
            />

            <label className="form-label" htmlFor="countryofformation">
              Country of Formation
            </label>

            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Select</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
            </select>

            <label className="form-label" htmlFor="operatingstatus">
              Operating Status
            </label>

            <select
              name="operatingStatus"
              value={form.operatingStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="ACTIVE">Active & Trading</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <label className="form-label" htmlFor="fiscalyearend">
              Fiscal Year End
            </label>

            <select
              name="fiscalYearEnd"
              value={form.fiscalYearEnd}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="DEC">December 31st</option>
              <option value="MAR">March 31st</option>
            </select>
          </>
        )}

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

export default BusinessProfile;
