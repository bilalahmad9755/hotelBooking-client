import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logoutStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const logout = async()=>
  {
    dispatch({type: "LOGOUT"});
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel Booking</span>
        </Link>
        {user ? (
          <div style={logoutStyling}>
            <p>{user.username}</p> <button className="navButton" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={()=> {navigate("/register",{state: {action: "register"}})}}>Register</button>
            <button className="navButton"onClick={()=> {navigate("/login",{state: {action: "login"}})}}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
