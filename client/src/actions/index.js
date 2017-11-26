import {SELECT_CATEGORY, REQUEST_DATA, RECEIVE_DATA} from "./types.js";
import axios from "axios";

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
