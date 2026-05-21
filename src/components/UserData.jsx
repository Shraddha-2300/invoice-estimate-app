import React from "react";
//import "../styles/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserData() {
  const printData = (data) => {
    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(data.phone)) {
      toast.error("Please enter valid 10-digit phone number");
      return;
    }

    if (!formData.has("terms")) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    data.terms = formData.has("terms");

    printData(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>UserDetails</h2>
        <label className="form-label" htmlFor="name">
          Name :
        </label>
        <input type="text" name="name" />

        <label className="form-label" htmlFor="email">
          Email :
        </label>
        <input type="email" name="email" />

        <label className="form-label" htmlFor="phone">
          Phone Number :
        </label>
        <input id="phone" type="tel" name="name" />

        <label className="form-label" htmlFor="password">
          Password :
        </label>
        <input id="password" type="password" name="password" />

        <label className="form-label" htmlFor="confrim password">
          Confirm Password :
        </label>
        <input id="confirmpassword" type="password" name="confirmpassword" />

        <div>
          <label className="form-label">Gender</label>

          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="Female">Male</label>
        </div>

        <div>
          <label className="form-label">Hobbies</label>

          <input type="checkbox" id="reading" name="hobbies" value="reading" />
          <label htmlFor="reading">Reading</label>

          <input type="checkbox" id="dancing" name="hobbies" value="dancing" />
          <label htmlFor="dancing">Dancing</label>

          <input type="checkbox" id="coding" name="hobbies" value="coding" />
          <label htmlFor="coding">Coding</label>
        </div>

        <div>
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <select id="country" name="country">
            <option value="">Select</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="usa">USA</option>
          </select>
        </div>

        <div>
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">I agree to Terms & Conditions</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserData;
