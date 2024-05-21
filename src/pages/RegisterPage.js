import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [values, setValues] = useState({
    user: "",
    password: "",
    role: "",
  });

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(values.user));
  }, [values.user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(values.password));
    setValidMatch(values.password === values.confirmPassword);
  }, [values.password, values.confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [values.user, values.password, values.confirmPassword, values.role]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      {success ? (
        <div className="App">
          <section>
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
          </section>
        </div>
      ) : (
        <div className="App">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>
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
                must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirmPassword">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validMatch && values.confirmPassword ? "valid" : "hide"
                  }
                />
                <FontAwesomeIcon
                  icon={
                    validMatch || !values.confirmPassword ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                className="role-input"
                value={values.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="manager">Manager</option>
                <option value="teamLeader">Team Leader</option>
                <option value="telecaller">Telecaller</option>
              </select>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
