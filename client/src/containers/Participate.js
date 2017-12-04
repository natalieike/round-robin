import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import EventSearch from "../components/EventSearch";
import EventResults from "../components/EventResults";
import { selectCategory, fetchCategories, searchEvents, fetchMyEvents, joinEvent } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'
import MyEvents from "../components/MyEvents";

class Participate extends Component {
  componentDidMount() {
    if(this.props.isLoggedIn){
      this.props.dispatch(fetchCategories());
      this.props.dispatch(fetchMyEvents(this.props.user));
    }
  };

  handleChange = selectedCategory => {
    this.props.dispatch(selectCategory(selectedCategory))
  };

  handleClick = event => {
    event.preventDefault();
    this.props.dispatch(searchEvents(this.props.category));
  }

  handleJoin = event => {
    event.preventDefault();
    let index = this.props.myEvents.find(x => x.event.id == event.target.value);
    console.log(index);
    console.log(this.props.myEvents);
    if(!this.props.myEvents.find(x => x.event.id == event.target.value)){
        this.props.dispatch(joinEvent({
          eventId: event.target.value, 
          userId: this.props.user
        }));
    }else{
      console.log("already joined");
    }
  }

  componentWillReceiveProps(nextProps) {
		console.log(nextProps);
  }

	render() {
    const { category, categories, events, myEvents, loginStatus, isLoggedIn } = this.props
    let data;
    if (loginStatus == "connected"){
      data = <div>
        <EventSearch value={parseInt(category)}
          options={categories} 
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <EventResults 
          results={events}
          onClick={this.handleJoin}
        />
        <MyEvents 
          results={myEvents}
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
		      <h1>Participate</h1>
		      <h4>Search for Events and Manage your Current Events</h4>
		    </div>
        {data}
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ selectCategory, fetchCategories, searchEvents, fetchMyEvents, joinEvent });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
	return{
		categories: state.allCategories.categories,
		category: state.selectCategories.category,
		isFetching: state.allCategories.isFetching,
		events: state.allCategories.events, 
		myEvents: state.allCategories.myEvents,
		user: state.loginReducer.userId,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn
	 };
	};

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
