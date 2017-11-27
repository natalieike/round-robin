import {SELECT_CATEGORY, REQUEST_DATA, RECEIVE_DATA, SELECT_MATCHOPTION, REGISTER_FORMDATA} from "./types.js";
import axios from "axios";
import moment from "moment";

export const selectCategory = category => {
	return{
		type: SELECT_CATEGORY,
		category
	};
};

const requestCategories = () => ({
	type: REQUEST_DATA,
	payload: "Requesting"
});

const recieveCategories = (json) => {
	let categoryArray = [];
	json.data.forEach(category => {
		categoryArray.push(category);
	});
	return {
		type: RECEIVE_DATA,
		categories: categoryArray
	};
};

export const fetchCategories = () => dispatch => {
	dispatch(requestCategories)
	const baseURL = "/api/events/categories/all";
	return axios.get(baseURL)
		.then(json => {
			dispatch(recieveCategories(json));
		});
};

const requestEvents = () => ({
	type: REQUEST_DATA,
	payload: "Requesting"
});

const receiveEvents = (json) => {
	let eventArray = [];
	let signup;
	let shipping;
	json.data.forEach(event => {
		if(!event.organizerAka){
			event.organizer = event.user.firstName + " " + event.user.lastName;
		} else{
			event.organizer = event.organizerAka;
		}
		if(moment(event.signupDeadline).isValid()){
			signup = moment(event.signupDeadline).format("MM/DD/YYYY");
		} else{
			signup = "TBD";
		}
		if(moment(event.shipDeadline).isValid()){
			shipping = moment(event.shipDeadline).format("MM/DD/YYYY");			
		}else{
			shipping = "TBD";
		}
		event.signupDeadline = signup;
		event.shipDeadline = shipping;
		eventArray.push(event);
	});
	return {
		type: RECEIVE_DATA,
		events: eventArray
	};	
};

export const searchEvents = categoryId => dispatch => {
	dispatch(requestEvents)
	const baseURL = `/api/events/options/categoryId&${categoryId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveEvents(json));
		});
};

const receiveMyEvents = (json) => {
	let eventArray = [];
	let signup;
	let shipping;
	json.data.forEach(myevent => {
		console.log(myevent);
		if(!myevent.event.organizerAka){
			myevent.event.organizer = myevent.event.user.firstName + " " + myevent.event.user.lastName;
		} else{
			myevent.event.organizer = myevent.event.organizerAka;
		}
		if(moment(myevent.event.signupDeadline).isValid()){
			signup = moment(myevent.event.signupDeadline).format("MM/DD/YYYY");
		} else{
			signup = "TBD";
		}
		if(moment(myevent.event.shipDeadline).isValid()){
			shipping = moment(myevent.event.shipDeadline).format("MM/DD/YYYY");			
		}else{
			shipping = "TBD";
		}
		myevent.event.signupDeadline = signup;
		myevent.event.shipDeadline = shipping;
		eventArray.push(myevent);
	});
	return {
		type: RECEIVE_DATA,
		myEvents: eventArray
	};	
};

export const fetchMyEvents = userId => dispatch => {
	dispatch(requestEvents);
	const baseURL = `/api/events/user/${userId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveMyEvents(json));
		});
};

const receiveMyManagedEvents = (json) => {
	let eventArray = [];
	let signup;
	let shipping;
	json.data.forEach(myevent => {
		console.log(myevent);
		if(moment(myevent.signupDeadline).isValid()){
			signup = moment(myevent.signupDeadline).format("MM/DD/YYYY");
		} else{
			signup = "TBD";
		}
		if(moment(myevent.shipDeadline).isValid()){
			shipping = moment(myevent.shipDeadline).format("MM/DD/YYYY");			
		}else{
			shipping = "TBD";
		}
		myevent.signupDeadline = signup;
		myevent.shipDeadline = shipping;
		eventArray.push(myevent);
	});
	return {
		type: RECEIVE_DATA,
		myManagedEvents: eventArray
	};	
};

export const fetchMyManagedEvents = userId => dispatch => {
	dispatch(requestEvents);
	const baseURL = `/api/events/options/userId&${userId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveMyManagedEvents(json));
		});
};

export const selectMatchOptions = option => {
	return{
		type: SELECT_MATCHOPTION,
		option
	};
};

export const registerEventNameChange = data => {
	return {
		type: REGISTER_FORMDATA,
		eventName: data
	};
};

export const registerOrganizerAkaChange = data => {
	return {
		type: REGISTER_FORMDATA,
		organizerAka: data
	};
};

export const registerAboutEventChange = data => {
	return {
		type: REGISTER_FORMDATA,
		aboutEvent: data
	};
};

export const registerRadioButtonChange = data => {
	return {
		type: REGISTER_FORMDATA,
		isPrivate: data
	};
};
