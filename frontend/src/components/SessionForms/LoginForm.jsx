import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";

import { login, clearSessionErrors } from "../../store/session";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="loginForm">
      <form className="sessionForm" onSubmit={handleSubmit}>
        {/* <h2>Log In Form</h2> */}
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email</span>
        </label>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          // placeholder="Email"
        />

        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password</span>
        </label>
        <input type="password" value={password} onChange={update("password")} />

        <input
          className={email ? "active" : "login"}
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </form>
      <div className="signUp">
        <p className="session-redirect">
          New to Habit Tree?&#160;
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
