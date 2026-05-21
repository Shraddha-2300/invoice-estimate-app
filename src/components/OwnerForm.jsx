import React from "react";

function OwnerForm({
  owner = {},
  index,
  handleChange,
  removeOwner,
}) {
  return (
    <div
      className="
        bg-gray-50
        border
        border-gray-200
        rounded-2xl
        p-6
        mb-6
        shadow-sm
      "
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Owner {index + 1}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={owner.fullName || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter full name"
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          />
        </div>

        

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ownership %
          </label>

          <input
            type="number"
            name="ownershipPercentage"
            value={owner.ownershipPercentage || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Enter percentage"
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          />
        </div>

        

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date of Birth
          </label>

          <input
            type="date"
            name="dob"
            value={owner.dob || ""}
            onChange={(e) => handleChange(index, e)}
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
            "
          />
        </div>

        

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => removeOwner(index)}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              font-medium
              py-3
              rounded-xl
              transition
            "
          >
            Remove Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerForm;