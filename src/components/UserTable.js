import React from "react";

const UserTable = ({ users }) => {
  return (
    <div className="user-table-container">
      {/* <h2>User List</h2> */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Company ID</th> {/* Add column for company ID */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.company_id}</td> {/* Display company ID */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
