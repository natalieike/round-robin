import {SELECT_CATEGORY, REQUEST_DATA, RECEIVE_DATA} from "./types.js";
import axios from "axios";
import moment from "moment";

export const selectCategory = category => {
	console.log(category);
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
	console.log("receiveEvents");
	console.log(json);
	let eventArray = [];
	json.data.forEach(event => {
		if(!event.organizerAka){
			event.organizer = event.user.firstName + " " + event.user.lastName;
		} else{
			event.organizer = event.organizerAka;
		}
		let signup = moment(event.signupDeadline).format("MM/DD/YYYY");
		let shipping = moment(event.shipDeadline).format("MM/DD/YYYY");
		event.signupDeadline = signup;
		event.shipDeadline = shipping;
		eventArray.push(event);
		console.log(event);
	});
	return {
		type: RECEIVE_DATA,
		events: eventArray
	};	
};

export const searchEvents = categoryId => dispatch => {
	console.log("CategoryID: " + categoryId);
	dispatch(requestEvents)
	const baseURL = `/api/events/options/categoryId&${categoryId}`;
	return axios.get(baseURL)
		.then(json => {
			dispatch(receiveEvents(json));
		});
}
