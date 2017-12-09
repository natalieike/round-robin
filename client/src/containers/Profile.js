import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import { connect } from 'react-redux';
import { getUserData, submitUserData } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'
import {reset} from 'redux-form';



class Profile extends Component {
  componentDidMount() {
  	console.log(this.props);
  	this.props.dispatch(getUserData(this.props.user));
  	
/*    if(this.props.isLoggedIn){
      this.props.dispatch(fetchMyManagedEvents(this.props.user));
      this.props.dispatch(fetchCategories());  
    }
*/
  };

  submit = values => {
	  console.log(values);
	  const {aboutMe, city, country, email, firstName, lastName, postalCode, shippingPreferenceId, stateProvinceName, streetAddress} = values;
	  let profileUpdate = {
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
	  console.log(profileUpdate);
	  this.props.dispatch(submitUserData(this.props.user, profileUpdate))
		this.props.dispatch(reset('profile'));
	};


	render() {
    const { user, isLoggedIn, loginStatus, userData } = this.props
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

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ reset, getUserData, submitUserData });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
  console.log(state);
	return{
    user: state.loginReducer.userId,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn,
    userData: state.manageUserData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
