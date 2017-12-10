import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import { connect } from 'react-redux';
import { getUserData, submitUserData } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux';
import {reset} from 'redux-form';
import DetailsModal from "../components/DetailsModal";

class Profile extends Component {
  componentDidMount() { 	
   if(this.props.isLoggedIn){
  	this.props.dispatch(getUserData(this.props.user));
    }
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.isLoggedIn && nextProps.isLoggedIn){
  		this.props.dispatch(getUserData(nextProps.user));
    }
  }

  submit = values => {
	  const {aboutMe, city, country, email, firstName, lastName, postalCode, shippingPreferenceId, stateProvinceName, streetAddress} = values;
	  let profileUpdate = {
	  	email: email,
	  	country: country,
	  	stateProvince: stateProvinceName,
			firstName: firstName,
			lastName: lastName,
			streetAddress: streetAddress,
			city: city,
			postalCode: postalCode,
			aboutMe: aboutMe,
			shippingPreferenceId: shippingPreferenceId,
	  };
	  this.props.dispatch(submitUserData(this.props.user, profileUpdate));
		this.props.dispatch(reset('profile'));
	};


	render() {
    const { user, isLoggedIn, loginStatus, userData } = this.props
        let data;
    if (loginStatus == "connected"){
      data = <div>
		    <ProfileForm
		    	onSubmit={this.submit}
		    />
      </div>
    } else {
      data = <div>
        <p>You must be logged in to view this content.</p>
      </div>
    }
		return(
		  <div>
		    <div className="jumbotron">
		      <h1>Profile</h1>
		      <h4>Edit Your Profile Details</h4>
		    </div>
		    {data}
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ reset, getUserData, submitUserData });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
	return{
    user: state.loginReducer.userId,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn,
    userData: state.manageUserData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
