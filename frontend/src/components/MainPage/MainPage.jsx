import "./MainPage.css";
import LoginForm from "../SessionForms/LoginForm";
import { AuthRoute } from "../Routes/Routes";

const MainPage = () => {
  return (
    <div className="main">
      <h1>Habit Tree</h1>
      {/* <div> */}
      <AuthRoute component={LoginForm} />
      {/* </div> */}
      <footer className="footer">Copyright &copy; 2024 Habit Tree</footer>
    </div>
  );
};

export default MainPage;
