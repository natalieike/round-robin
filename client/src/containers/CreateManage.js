import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ManageMyEvents from "../components/ManageMyEvents";
import { fetchMyManagedEvents } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'

class CreateManage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMyManagedEvents(this.props.user));
  };
/*
  handleChange = selectedCategory => {
    this.props.dispatch(selectCategory(selectedCategory))
  };

  handleClick = event => {
    event.preventDefault()
    this.props.dispatch(searchEvents(this.props.category));
  }
*/
  componentWillReceiveProps(nextProps) {
		console.log(nextProps);
  }

	render() {
    const { isFetching, myManagedEvents, user } = this.props
		return(
		  <div>
		    <div className="jumbotron">
		      <h1>Create / Manage Events</h1>
		      <h4>Create your own Swap, and Manage the Swaps you are Moderating</h4>
		    </div>
		    <ManageMyEvents 
		    	results={myManagedEvents}
		    />
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ fetchMyManagedEvents });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
	return{
		isFetching: state.manageMyEvents.isFetching,
		myManagedEvents: state.manageMyEvents.myManagedEvents,
		user: state.manageMyEvents.user
	 };
	};

export default connect(mapStateToProps, mapDispatchToProps)(CreateManage);
