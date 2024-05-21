import React, { useState } from "react";
import axios from "axios";

function AddCompany() {
  const [companyDetails, setCompanyDetails] = useState({
    companyId: "",
    companyName: "",
    companyGST: "",
    companyAddress: "",
    contactNumber: "",
    user_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();

    const {
      companyId,
      companyName,
      companyGST,
      companyAddress,
      contactNumber,
      user_id,
    } = companyDetails;

    axios
      .post("http://localhost:3001/add-company", {
        companyId,
        companyName,
        companyGST,
        companyAddress,
        contactNumber,
        user_id,
      })
      .then((res) => {
        console.log("Company details submitted successfully:", res.data);
        // Handle success (if needed)
      })
      .catch((err) => {
        console.error("Error submitting company details:", err);
        // Handle error, display error message, etc.
      });
  };

  return (
    <div className="form-container">
      <div className="company-form">
        <h2>Add Company Details</h2>
        <form onSubmit={handleCompanySubmit}>
          <label htmlFor="companyId">Company ID:</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={companyDetails.companyId}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyDetails.companyName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyGST">Company GST:</label>
          <input
            type="text"
            id="companyGST"
            name="companyGST"
            value={companyDetails.companyGST}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyAddress">Company Address:</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={companyDetails.companyAddress}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={companyDetails.contactNumber}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={companyDetails.user_id}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
