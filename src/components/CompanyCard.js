import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <Link to={`/company/${company.id}`} className="company-link">
      <div className="company-card">
        <h3>{company.companyName}</h3>
        <p>Company ID: {company.companyId}</p>
        <p>Company GST: {company.companyGST}</p>
        <p>Address: {company.companyAddress}</p>
        <p>Contact Number: {company.contactNumber}</p>
      </div>
    </Link>
  );
};

export default CompanyCard;
