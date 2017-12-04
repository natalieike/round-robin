import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ManageMyEvents from "../components/ManageMyEvents";
import { fetchMyManagedEvents, fetchCategories, selectCategory, selectMatchOptions, registerEventNameChange, registerOrganizerAkaChange, registerAboutEventChange, registerRadioButtonChange, submitNewEvent } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'
import CreateEvent from "../components/CreateEvent"

class CreateManage extends Component {
  componentDidMount() {
  	console.log(this.props);
    if(this.props.isLoggedIn){
      this.props.dispatch(fetchMyManagedEvents(this.props.user));
      this.props.dispatch(fetchCategories());  
    }
  };

  handleCategoryChange = (selectedCategory) => {
    this.props.dispatch(selectCategory(parseInt(selectedCategory)));
  };

  handleOptionChange = selectedOption => {
    this.props.dispatch(selectMatchOptions(parseInt(selectedOption)));
  };

  handleEventNameChange = name => {
  	this.props.dispatch(registerEventNameChange(name));
  };

  handleOrganizerAkaChange = organizer => {
  	this.props.dispatch(registerOrganizerAkaChange(organizer));
  };

  handleAboutEventChange = about => {
  	this.props.dispatch(registerAboutEventChange(about));
  };

	handleRadioButtonChange= radio => {
  	this.props.dispatch(registerRadioButtonChange(radio));
  };

  handleClick = event => {
    event.preventDefault()
    let newEventData = {
    	eventName: this.props.eventName,
    	organizerAka: this.props.organizerAka,
    	isPrivate: this.props.isPrivate,
    	aboutEvent: this.props.aboutEvent,
    	categoryId: this.props.category,
    	userId: this.props.user,
    	matchOptionId: this.props.matchOption
    }
    this.props.dispatch(submitNewEvent(newEventData));
  }

  componentWillReceiveProps(nextProps) {
		console.log(nextProps);
  }

	render() {
    const { isFetching, myManagedEvents, user, categories, category, matchOption, eventName, organizerAka, aboutEvent, isPrivate, isLoggedIn, loginStatus } = this.props
    let data;
    if (loginStatus == "connected"){
      data = <div>
        <CreateEvent
          categoryvalue={category}
          options={categories} 
          onCategoryChange={this.handleCategoryChange}
          onClick={this.handleClick}
          matchoptionvalue={matchOption}
          onOptionChange={this.handleOptionChange}
          eventnamevalue={eventName}
          onEventNameChange={this.handleEventNameChange}
          organizerAkaValue={organizerAka}
          onOrganizerAkaChange={this.handleOrganizerAkaChange}
          aboutEventValue={aboutEvent}
          onAboutEventChange={this.handleAboutEventChange}
          onRadioButtonChange={this.handleRadioButtonChange}
        />
        <ManageMyEvents 
          results={myManagedEvents}
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
		      <h1>Create / Manage Events</h1>
		      <h4>Create your own Swap, and Manage the Swaps you are Moderating</h4>
		    </div>
        {data}
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ fetchMyManagedEvents, fetchCategories, selectCategory, selectMatchOptions, registerEventNameChange, registerOrganizerAkaChange, registerAboutEventChange, registerRadioButtonChange, submitNewEvent });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
  console.log(state);
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
		isPrivate: state.registerFormData.isPrivate,
    loginStatus: state.loginReducer.loginStatus, 
    isLoggedIn: state.loginReducer.loggedIn
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateManage);
