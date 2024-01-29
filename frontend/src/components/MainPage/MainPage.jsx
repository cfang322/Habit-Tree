import "./MainPage.css";
import LoginForm from "../SessionForms/LoginForm";
import { AuthRoute } from "../Routes/Routes";
import { useState } from "react";
import signUpForm from "../SessionForms/SignupForm";

const MainPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLoginUp, setShowLogin] = useState(true);
  return (
    <div className="main">
      <div className="title">
        <h1>Habit Tree</h1>
      </div>

      {showLoginUp && (
        <AuthRoute
          component={LoginForm}
          setShowSignUp={setShowSignUp}
          setShowLogin={setShowLogin}
        />
      )}
      {showSignUp && (
        <AuthRoute
          component={signUpForm}
          setShowSignUp={setShowSignUp}
          setShowLogin={setShowLogin}
        />
      )}

      <footer className="footer">Copyright &copy; 2024 Habit Tree</footer>
    </div>
  );
};

export default MainPage;
