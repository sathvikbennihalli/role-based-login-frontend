import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import CompanyPage from "./pages/CompanyHomePage";
import AddCompany from "./pages/AddCompany";
import ViewCompany from "./pages/ViewCompany";
import AddUser from "./pages/AddUser";
import ViewUser from "./pages/ViewUser";
import Layout from "./pages/Layout";
import Cookies from "js-cookie";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [userRole, setUserRole] = useState(null);

  const roles = {
    admin: "admin",
    developer: "developer",
    manager: "manager",
    teamLeader: "teamLeader",
    telecaller: "telecaller",
  };

  useEffect(() => {
    // Access the role value from cookies
    const storedRole = Cookies.get("userRole");
    console.log("Stored role:", storedRole); // Log the stored role value
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/view-company" element={<ViewCompany />} />
        <Route path="/view-user" element={<ViewUser />} />
        <Route
          element={
            <RequireAuth
              userRole={userRole}
              allowedRoles={[roles.admin, roles.manager, roles.teamLeader]}
            />
          }
        >
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/add-user" element={<AddUser />} />
        </Route>
        <Route path="/company/:companyID" element={<CompanyPage />} />{" "}
      </Route>
    </Routes>
  );
}

export default App;
