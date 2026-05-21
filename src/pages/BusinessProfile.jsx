import React, { useState } from "react";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Business Profile
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your company details
        </p>

        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Legal Business Name
          </label>

          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Entity Type
            </label>

            <select
              name="entityType"
              value={form.entityType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="SOLE_PROP">Sole Proprietorship</option>
              <option value="PARTNERSHIP">Partnership</option>
              <option value="LLC">LLC</option>
              <option value="CORP">Corporation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Industry Sector
            </label>

            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="TECH">Technology</option>
              <option value="FINANCE">Finance</option>
              <option value="HEALTH">Healthcare</option>
            </select>
          </div>
        </div>

        
        {form.entityType !== "SOLE_PROP" && (
          <>
            
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                maxLength={20}
                placeholder="Enter registration number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country of Formation
                </label>

                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Operating Status
                </label>

                <select
                  name="operatingStatus"
                  value={form.operatingStatus}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">Active & Trading</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fiscal Year End
              </label>

              <select
                name="fiscalYearEnd"
                value={form.fiscalYearEnd}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="DEC">December 31st</option>
                <option value="MAR">March 31st</option>
              </select>
            </div>
          </>
        )}

      
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

export default BusinessProfile;
