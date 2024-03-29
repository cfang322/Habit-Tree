
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { logout } from "../../store/reducers/session";
import logo from "../../assets/logo.png";

function NavBar() {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  
  const sessionUser = useSelector((state) => state.session.user);
  
  const sessionLinks = (
    <div className="dropdown-content">
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/about-us">About US</NavLink>
      <div onClick={logoutUser}>Logout</div>
    </div>
  );
  
  return (
    <div className="navBar">
      <div className="homeBtn">
        <div className="home">
          <NavLink to="/feed">
            <img src={logo} alt="logo" width={50} height={50} />
          </NavLink>
          <NavLink to="/feed">
            <div className="typewriter-text">HABIT-TREE</div>
          </NavLink>
        </div>
      </div>
      <div className="logout">
        <div className="logoutBtn" onMouseOver={handleDropdownToggle}>
          { `Hello, ${sessionUser.username}` }
        </div>
        {showDropdown && sessionUser && sessionLinks}
      </div>
    </div>
  );
}

export default NavBar;