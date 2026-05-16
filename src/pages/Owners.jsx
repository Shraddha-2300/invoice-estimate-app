import React, { useState } from "react";
import "../styles/style.css";
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

      updatedOwners[otherIndex].ownershipPercentage = 100 - Number(value);
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
      const lowerCaseName = owner.fullName.trim().toLowerCase();

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

    //console.log(owners);
    sessionStorage.setItem("ownersData", JSON.stringify(owners));
    navigate("/review");
   // toast.success("Owners Saved!");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Owners</h2>

        {owners.map((owner, index) => (
          <OwnerForm
            key={index}
            owner={owner}
            index={index}
            handleChange={handleChange}
            removeOwner={removeOwner}
          />
        ))}

        <button type="button" onClick={addOwner}>
          Add Owner
        </button>

        <div className="button-group">
          <button type="button" onClick={() => navigate("/address")}>
            Back
          </button>

          <button type="submit">Next</button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
}

export default Owners;
