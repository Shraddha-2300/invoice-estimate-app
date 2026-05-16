import React from "react";

function OwnerForm({ owner, index, handleChange, removeOwner }) {
  return (
    <div className="owner-card">
      <h3>Owner {index + 1}</h3>

      <label className="form-label" htmlFor="fullname">Full Name</label>
      <input
        type="text"
        name="fullName"
        value={owner.fullName}
        onChange={(e) => handleChange(index, e)}
      />

      <label className="form-label" htmlFor="ownership">Ownership %</label>
      <input
        type="number"
        name="ownershipPercentage"
        value={owner.ownershipPercentage}
        onChange={(e) => handleChange(index, e)}
      />

      <label className="form-label" htmlFor="dateofbirth">Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={owner.dob}
        onChange={(e) => handleChange(index, e)}
      />

      <button type="button" onClick={() => removeOwner(index)}>
        Remove
      </button>
    </div>
  );
}

export default OwnerForm;