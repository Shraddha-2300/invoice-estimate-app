import React from "react";
import "../styles/style.css";

function UserDetails() {
  const printData = (data) => {
    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    printData(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Basic Form</h2>

      <label className="form-label">Name:</label>
      <input type="text" name="name" />

      <label className="form-label">Phone:</label>
      <input type="tel" name="phone" />

      <label className="form-label">Email:</label>
      <input type="email" name="email" />
      

      <label className="form-label">Bio:</label>
      <textarea name="bio"></textarea>
      

      <label className="form-label">Profile Pic:</label>
      <input type="file" accept="image/*" />
     

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserDetails;
