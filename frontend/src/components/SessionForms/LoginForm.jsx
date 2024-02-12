import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";

import { login, clearSessionErrors } from "../../store/reducers/session";
import { Link } from "react-router-dom";

function LoginForm({ setShowSignUp, setShowLogin }) {
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
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDemoLogin = () => {
    dispatch(clearSessionErrors());
    setEmail("demo@user.io");
    setPassword("password");
    dispatch(login({ email: "demo@user.io", password: "password" }));
  };


  return (
    <div className="loginForm">
      <form className="sessionForm" onSubmit={handleSubmit}>
        <div id="errors">{errors?.email}</div>
        <label id="loginLabel">
          Email
        </label>
        <input
          id="sessionInput"
          type="text"
          value={email}
          onChange={update("email")}
        />

        <div id="errors">{errors?.password}</div>
        <label id="loginLabel">
          <span>Password</span>
        </label>
        <input type="password" id="sessionInput" value={password} onChange={update("password")} />
        <input
          className={email ? "active" : "btn"}
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
        <button className="demoBtn" onClick={handleDemoLogin}>
          Demo Login
        </button>
      </form>

      <div className="signUp">
        <p className="sessionRedirect">
          New to Habit Tree? &#160;
          <Link
            id="sessionLinkA"
            onClick={() => {
              setShowSignUp(true);
              setShowLogin(false);
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
