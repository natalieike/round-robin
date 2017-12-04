import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Home extends Component {


/*
	      	<a href="/auth/facebook"
	      		className="btn btn-primary searchBtn"
	      	>
	      	Facebook AUTH
	      	</a>
*/


	render() {
    const { isFetching, myManagedEvents, user, categories, category, matchOption, eventName, organizerAka, aboutEvent, isPrivate, isLoggedIn, loginStatus, firstName, lastName } = this.props
    let data;
    if (!isLoggedIn){
		  data = <h3 className="text-center">Log in with Facebook to Get Started!</h3>
    } else{
    	data = <h3 className="text-center">Thanks for logging in, {firstName} {lastName}!</h3>
    }
		return(
		  <div>
		    <div className="jumbotron">
		      <h1 className="text-center">Welcome to Round Robin!</h1>
		      <ul>
			      <li>Sign up to Manage and Participate in all kinds of swaps - Craft Exchanges, Secret Santas, Sweets Swaps, and More!</li>
			      <li>Create your own Swap - Make it Public or Private</li>
			      <li>Participate in Swaps - Private Swaps by Invite, or Search for Public Events</li>
			    </ul>
			    {data}
		    </div>
			</div>);
  };

 }
const mapStateToProps = state => {
  console.log(state);
	return{
		isFetching: state.manageMyEvents.isFetching,
		myManagedEvents: state.manageMyEvents.myManagedEvents,
    user: state.loginReducer.userId,
		categories: state.allCategories.categories,
		category: state.selectCategories.category, 
		matchOption: state.selectMatchOption.matchOption,
		eventName: state.registerFormData.eventName,
		organizerAka: state.registerFormData.organizerAka,
		aboutEvent: state.registerFormData.aboutEvent, 
		isPrivate: state.registerFormData.isPrivate,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn,
    firstName: state.loginReducer.firstName,
    lastName: state.loginReducer.lastName
	};
};

export default connect(mapStateToProps, null)(Home);
