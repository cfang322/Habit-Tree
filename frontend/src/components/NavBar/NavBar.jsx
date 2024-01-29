// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/reducers/session";
import "./NavBar.css";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // const getLinks = () => {
  //   if (loggedIn) {
  //     return (
  //       <div className="links-nav">
  //         {/* <Link to={"/tweets"}>All Tweets</Link>
  //         <Link to={"/profile"}>Profile</Link>
  //         <Link to={"/tweets/new"}>Write a Tweet</Link> */}
  //         <button onClick={logoutUser}>Logout</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="linksAuth">
  //         <Link to={"/signup"}>
  //           <button>Signup</button>
  //         </Link>
  //         {/* <Link to={"/login"}>Login</Link> */}
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className="navBar">
      {loggedIn && (
        <div className="links-nav">
          {/* <Link to={"/tweets"}>All Tweets</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/tweets/new"}>Write a Tweet</Link> */}
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
      
      {/* {getLinks()} */}
    </div>
  );
}

export default NavBar;
