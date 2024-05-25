import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const apiURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const Home = () => {
  const [auth, setAuth] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${apiURL}/authenticate`, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.user);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    axios
      .get(`${apiURL}/logout`)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  // Other code remains the same

  return (
    <div className="App">
      {auth && (
        <div className="authorized">
          <h3>You are Authorized --- {name}</h3>
          <button className="logout" onClick={handleDelete}>
            Logout
          </button>
        </div>
      )}
      {auth && (
        <div>
          <div className="button-container">
            <Link to="/add-company">
              <button>Add Company</button>
            </Link>
            <Link to="/view-company">
              <button>View Company</button>
            </Link>
          </div>
        </div>
      )}
      {!auth && (
        <div className="unauthenticated">
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login">Login</Link>
        </div>
      )}
      {/* Render other components as needed */}
    </div>
  );
};

export default Home;
