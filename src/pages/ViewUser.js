import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import { useParams } from "react-router-dom";

function ViewUser() {
  const { companyID } = useParams();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/view-users?companyID=${companyID}`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [companyID]);

  return (
    <div className="form-container">
      {loading ? <p>Loading...</p> : <UserTable users={users} />}
    </div>
  );
}

export default ViewUser;
