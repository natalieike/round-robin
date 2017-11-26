import {selectCategory, fetchCategories} from "../actions";

export const selectCategories = (state={
	isFetching: false,
	categories: [],
	category: 1
}, action) => {
	switch(action.type){
		case "SELECT_CATEGORY":
			return {
				...state,
				category: action.category
			}
		default:
			return state
	}
}

export const allCategories = (state = { 
		isFetching: false, 
		categories: [],
		category: 1,
		events: [] 
	}, action) => {
	switch(action.type){
		case "REQUEST_DATA":
			return{
				...state,
				isFetching: true
			}
		case "RECEIVE_DATA":
			let newState = {
				...state,
				isFetching: false
			};
			if(action.categories){
				newState.categories = action.categories;
			}
			if(action.events){
				newState.events = action.events;
			}
			return newState;
		default:
			return state
	}
}