import React, { Component } from 'react';
import {connect} from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
      </div>
    );
  }
}

export default connect(null, actions)(App);
