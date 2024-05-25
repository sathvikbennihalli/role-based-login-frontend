import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../components/axiosInstance";

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const apiURL = process.env.REACT_APP_API_URL;

const Login = ({ onLoginSuccess }) => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [values, setValues] = useState({
    user: "",
    password: "",
  });

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(values.user));
  }, [values.user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(values.password));
  }, [values.password]);

  useEffect(() => {
    setErrMsg("");
  }, [values.user, values.password]);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`${apiURL}/login`, values);
      if (res.data.Status === "Success") {
        const { role } = res.data; // Extract 'role' from the response
        Cookies.set("userRole", role, { expires: 1 }); // 'role' is the value you want to store
        // // Cookies.set("token", res.data.Cookies.)
        // console.log(res.headers.);

        // Cookies.set("token", res.data.token, { expires: 7, secure: true });

        onLoginSuccess(role);
        navigate(from, { replace: true });
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !values.user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="user"
            name="user"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            value={values.user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && values.user && !validName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            enter valid E-mail id
          </p>

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !values.password ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <button disabled={!validName || !validPwd}>Login</button>
        </form>
        <p>
          Not registered yet?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
