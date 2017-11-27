import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import EventSearch from "../components/EventSearch";
import EventResults from "../components/EventResults";
import { selectCategory, fetchCategories, searchEvents, fetchMyEvents } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'
import MyEvents from "../components/MyEvents";

class Participate extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchMyEvents(this.props.user));
  };

  handleChange = selectedCategory => {
    this.props.dispatch(selectCategory(selectedCategory))
  };

  handleClick = event => {
    event.preventDefault()
    this.props.dispatch(searchEvents(this.props.category));
  }

  componentWillReceiveProps(nextProps) {
		console.log(nextProps);
  }

	render() {
    const { category, categories, events, myEvents } = this.props
		return(
		  <div>
		    <div className="jumbotron">
		      <h1>Participate</h1>
		      <h4>Search for Events and Manage your Current Events</h4>
		    </div>
		    <EventSearch value={parseInt(category)}
                options={categories} 
                onChange={this.handleChange}
                onClick={this.handleClick}
        />
        <EventResults 
        	results={events}
        />
        <MyEvents 
        	results={myEvents}
        />
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ selectCategory, fetchCategories, searchEvents, fetchMyEvents });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
	return{
		categories: state.allCategories.categories,
		category: state.selectCategories.category,
		isFetching: state.allCategories.isFetching,
		events: state.allCategories.events, 
		myEvents: state.allCategories.myEvents,
		user: state.allCategories.user
	 };
	};

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
