import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwnerForm from "../components/OwnerForm";
import { useNavigate } from "react-router-dom";

function Owners() {
  const navigate = useNavigate();

  const [owners, setOwners] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem("ownersData")) || [
        {
          fullName: "",
          ownershipPercentage: "",
          dob: "",
        },
      ]
    );
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedOwners = [...owners];

    // Prevent negative percentage
    if (name === "ownershipPercentage") {
      if (value < 0) return;
    }

    updatedOwners[index][name] = value;

    // Auto-calculate remaining percentage
    if (name === "ownershipPercentage" && owners.length === 2) {
      const otherIndex = index === 0 ? 1 : 0;

      updatedOwners[otherIndex].ownershipPercentage =
        100 - Number(value);
    }

    setOwners(updatedOwners);
  };

  const addOwner = () => {
    if (owners.length >= 5) {
      toast.error("Maximum 5 owners allowed");
      return;
    }

    setOwners([
      ...owners,
      {
        fullName: "",
        ownershipPercentage: "",
        dob: "",
      },
    ]);
  };

  const removeOwner = (index) => {
    if (owners.length === 1) {
      toast.error("At least one owner is required");
      return;
    }

    const updatedOwners = owners.filter((_, i) => i !== index);

    setOwners(updatedOwners);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;

    const ownerNames = [];

    for (let i = 0; i < owners.length; i++) {
      const owner = owners[i];

      if (!owner.fullName.trim()) {
        toast.error(`Owner ${i + 1}: Name required`);
        return;
      }

      // Duplicate owner validation
      const lowerCaseName =
        owner.fullName.trim().toLowerCase();

      if (ownerNames.includes(lowerCaseName)) {
        toast.error("Duplicate owners are not allowed");
        return;
      }

      ownerNames.push(lowerCaseName);

      if (!owner.ownershipPercentage) {
        toast.error(`Owner ${i + 1}: Percentage required`);
        return;
      }

      if (owner.ownershipPercentage < 0) {
        toast.error("Percentage cannot be negative");
        return;
      }

      if (owner.ownershipPercentage > 100) {
        toast.error("Percentage cannot exceed 100");
        return;
      }

      if (!owner.dob) {
        toast.error(`Owner ${i + 1}: DOB required`);
        return;
      }

      total += Number(owner.ownershipPercentage);
    }

    if (total > 100) {
      toast.error("Total ownership cannot exceed 100%");
      return;
    }

    sessionStorage.setItem(
      "ownersData",
      JSON.stringify(owners)
    );

    navigate("/review");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="
          max-w-2xl
          mx-auto
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          space-y-6
        "
      >
        
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Owners Information
          </h2>

          <p className="text-gray-500 mt-2">
            Add all company owners and their ownership details.
          </p>
        </div>

        

        <div className="space-y-6">
          {owners.map((owner, index) => (
            <div
              key={index}
              className="
                border
                border-gray-200
                rounded-xl
                p-5
                bg-gray-50
              "
            >
              <OwnerForm
                owner={owner}
                index={index}
                handleChange={handleChange}
                removeOwner={removeOwner}
              />
            </div>
          ))}
        </div>

        

        <button
          type="button"
          onClick={addOwner}
          className="
            w-full
            border-2
            border-dashed
            border-indigo-400
            text-indigo-600
            font-semibold
            py-3
            rounded-xl
            hover:bg-indigo-50
            transition
          "
        >
          + Add Owner
        </button>

        

        <div className="flex gap-4">
          
          <button
            type="submit"
            className="
              flex-1
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            Next
          </button>

          <button
            type="button"
            onClick={() => navigate("/address")}
            className="
              flex-1
              bg-gray-200
              hover:bg-gray-300
              text-gray-800
              font-semibold
              py-3
              rounded-xl
              transition
            "
          >
            Back
          </button>

        </div>

      </form>

      <ToastContainer />

    </div>
  );
}

export default Owners;