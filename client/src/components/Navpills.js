import React from "react";
import { Link } from "react-router-dom";

const Navpills = () =>
  <ul className="nav nav-pills nav-justified">
    <li>
      <div className="fbbutton">
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
      </div>
    </li>
    <li className={window.location.pathname === "/home" ? "active" : ""}>
      <Link to="/home">Home</Link>
    </li>
    <li className={window.location.pathname === "/profile" ? "active" : ""}>
      <Link to="/profile">Profile</Link>
    </li>
    <li className={window.location.pathname === "/participate" ? "active" : ""}>
      <Link to="/participate">Participate</Link>
    </li>
    <li className={window.location.pathname === "/createmanage" ? "active" : ""}>
      <Link to="/createmanage">Create/Manage Events</Link>
    </li>
  </ul>;

export default Navpills;