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

  render() {
  return (
			<Router>
		    <div className="container Site">
		    	<div className="Site-content">
			      <Navpills 
			      	loginStatus = {this.props.loginStatus} 
			      />
			      <Route path="/" exact render={() => <Home />} />
			      <Route path="/profile" render={() => <Profile />} />
			      <Route path="/participate" render={() => <Participate />} />
			      <Route path="/createmanage" render={() => <CreateManage />} />
	      	</div>
		    </div>
		  </Router>
    );
  }
}

const mapStateToProps = state => {
	return{
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn,
	};
};
export default connect(mapStateToProps, actions)(App);
