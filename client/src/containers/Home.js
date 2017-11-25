import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
	state={
	};

	render() {
		return(
		  <div>
		    <div className="jumbotron">
		      <h1 className="text-center">Welcome to Round Robin!</h1>
		      <ul>
			      <li>Sign up to Manage and Participate in all kinds of swaps - Craft Exchanges, Secret Santas, Sweets Swaps, and More!</li>
			      <li>Create your own Swap - Make it Public or Private</li>
			      <li>Participate in Swaps - Private Swaps by Invite, or Search for Public Events</li>
			    </ul>
		      <h3 className="text-center">Sign in with Facebook to Get Started!</h3>
		    </div>
			</div>);
  };

 }

 export default Home;