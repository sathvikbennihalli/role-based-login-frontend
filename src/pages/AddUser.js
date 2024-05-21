import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [formData, setFormData] = useState({
    email: "",
    companyID: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/add-user",
        formData
      );
      console.log(response.data);
      setFormData({
        email: "",
        companyID: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error
    }
  };

  return (
    <div className="form-container">
      <section className="user-registration-form">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyID">CompanyID:</label>
          <input
            type="text"
            id="companyID"
            name="companyID"
            value={formData.companyID}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </div>
  );
}

export default AddUser;
