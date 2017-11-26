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


class App extends Component {
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

export default connect(null, actions)(App);
