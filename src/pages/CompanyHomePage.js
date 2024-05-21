import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CompanyPage = () => {
  const { companyID } = useParams();

  return (
    <div className="App">
      <h2>Company Page for Company ID: {companyID}</h2>
      <div className="button-container">
        <Link to="/add-user">
          <button>Add User</button>
        </Link>
        <Link to="/view-user">
          <button>View User</button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
