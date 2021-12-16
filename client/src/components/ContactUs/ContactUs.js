import { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [{ name, email }, setValue] = useState({ name: "", email: "" });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <div style={{ flexGrow: 1 }} className="contactus">
      <div className="contactContainer">
        <div id="contactContainer-left">
          <h1>Contact Us</h1>
          <label htmlfor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="fullname"
            placeholder="Full Name"
            value={name}
            onChange={handleInputChange}
            required
          />
          <label htmlfor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={() => {
              console.log("Submitted Form!", name, email);
              setValue({ name: "", email: "" });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
