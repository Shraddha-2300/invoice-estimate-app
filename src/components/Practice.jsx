import React from "react";

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

      <label>Name:</label>
      <br />
      <input type="text" name="name" />
      <br />
      <br />

      <label>Phone:</label>
      <br />
      <input type="tel" name="phone" />
      <br />
      <br />

      <label>Email:</label>
      <br />
      <input type="email" name="email" />
      <br />
      <br />

      <label>Bio:</label>
      <br />
      <textarea name="bio"></textarea>
      <br />
      <br />

      <label>Profile Pic:</label>
      <br />
      <input type="file" accept="image/*" />
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserDetails;
