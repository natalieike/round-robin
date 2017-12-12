import React from "react";
import { Link } from "react-router-dom";
import FbLogin from "./FbLogin";

/*  
*/    

const Navpills = () =>
  <ul className="nav nav-pills nav-justified robinNav">
    <li>
      <FbLogin fb={window.FB}/>
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