import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Navpills from "./components/Navpills";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Participate from "./containers/Participate";
import CreateManage from "./containers/CreateManage";
import * as actions from "./actions";
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'

class App extends Component {
/*	
  componentDidMount() {
  	console.log("mounting app");
  	this.props.dispatch(actions.isLoggedIn())

  };
*/

  render() {
    return (
			<Router>
		    <div className="container">
		      <Navpills />
		      <Redirect exact from="/" to="/home"/>
		      <Route path="/home" render={() => <Home />} />
		      <Route path="/profile" render={() => <Profile />} />
		      <Route path="/participate" render={() => <Participate />} />
		      <Route path="/createmanage" render={() => <CreateManage />} />
		    </div>
		  </Router>
    );
  }
}

/*
const mapDispatchToProps = dispatch => {
  let dispatchActions = bindActionCreators(actions);
  return { ...dispatchActions, dispatch };
}

const mapStateToProps = state => {
	return{
		isFetching: state.manageMyEvents.isFetching,
		myManagedEvents: state.manageMyEvents.myManagedEvents,
		user: state.manageMyEvents.user,
		categories: state.allCategories.categories,
		category: state.selectCategories.category, 
		matchOption: state.selectMatchOption.matchOption,
		eventName: state.registerFormData.eventName,
		organizerAka: state.registerFormData.organizerAka,
		aboutEvent: state.registerFormData.aboutEvent, 
		isPrivate: state.registerFormData.isPrivate
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
*/
export default connect(null, actions)(App);
