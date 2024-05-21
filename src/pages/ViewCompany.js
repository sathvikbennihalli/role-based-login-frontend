import React, { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

function ViewCompany() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiURL}/get-companies`)
      .then((res) => {
        setCompanies(res.data); // Store fetched companies in state
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  return (
    <div className="form-container">
      <div className="company-list">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <p>No companies available</p>
        )}
      </div>
    </div>
  );
}

export default ViewCompany;
