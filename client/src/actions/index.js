import {SELECT_CATEGORY, REQUEST_DATA, RECEIVE_DATA} from "./types.js";
import axios from "axios";

/*
export {SELECT_CATEGORY};
export {REQUEST_DATA};
export {RECEIVE_DATA};
*/

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
