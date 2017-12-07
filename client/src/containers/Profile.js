import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

class Profile extends Component {
/*	
  constructor (props) {
    super(props);
    this.state = { country: '', stateProvince: '' };
  }
*/
  submit = values => {
	  console.log(values)
	};

/*
	stateProvinceChange = value => {
   this.setState({ stateProvince: value })
	}

	countryChange = value =>{
   this.setState({ country: value })
	}
*/

	render() {
		return(
		  <div>
		    <div className="jumbotron">
		      <h1>Profile</h1>
		      <h4>Edit Your Profile Details</h4>
		    </div>
		    <ProfileForm
		    	onSubmit={this.submit}
		    />
			</div>);
  };

 }

 export default Profile;

