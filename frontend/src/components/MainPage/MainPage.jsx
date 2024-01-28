import "./MainPage.css";
import LoginForm from "../SessionForms/LoginForm";
import { AuthRoute } from "../Routes/Routes";

const MainPage = () => {
  return (
    <div className="main">
      <div className="title">
        <h1>Habit Tree</h1>
      </div>
      <AuthRoute component={LoginForm} />
      <footer className="footer">Copyright &copy; 2024 Habit Tree</footer>
    </div>
  );
};

export default MainPage;
