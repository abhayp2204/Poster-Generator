import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

// CSS
import "../../css/Navbar.css";

const Navbar = (value) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      // if (user) {
      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/firebase.User
      //   console.log(user);
      //   navigate("/main");
      // } else {
      //   navigate("/login");
      // }
    });
  });
  return (
    <header className="mainNavigation">
      <div className="mainNavigation__logo">
        <h1>Vinci</h1>
      </div>

      <nav className="mainNavigation__items">
        <ul>
          {user ? (
            <>
              <li>
                <NavLink to="/main"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus"> About us </NavLink>
              </li>
              <li>
                <NavLink to="/userprofile">Profile</NavLink>
              </li>
              <li id="gap">
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login"> Login </NavLink>
              </li>
              <li>
                <NavLink to="/register"> Registration </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
