import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./SessionForms.css";
import { signup, clearSessionErrors } from "../../store/reducers/session";
import "./SignupForm.css";
import { Link } from "react-router-dom";

function SignupForm({ setShowSignUp, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <div className="signupForm">
      <form className="sessionForm" onSubmit={handleSubmit}>
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email</span>{" "}
        </label>
        <input type="text" value={email} onChange={update("email")} />

        <div className="errors">{errors?.username}</div>
        <label>
          <span>Username</span>
        </label>
        <input
          // className="signInput"
          type="text"
          value={username}
          onChange={update("username")}
        />

        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password</span>
        </label>
        <input
          // className="signInput"
          type="password"
          value={password}
          onChange={update("password")}
        />

        <div className="errors">
          {password !== password2 && "Confirm Password field must match"}
        </div>
        <label>
          <span>Confirm Password</span>
        </label>
        <input
          // className="signInput"
          type="password"
          value={password2}
          onChange={update("password2")}
        />

        <input
          className={email || username ? "active" : "btn"}
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </form>
      <div className="login">
        <p className="session-redirect">
          Already in Habit Tree?&#160;
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => {
              setShowSignUp(false);
              setShowLogin(true);
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
