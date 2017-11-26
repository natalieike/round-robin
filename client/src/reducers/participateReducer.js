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
		category: 1 
	}, action) => {
	switch(action.type){
		case "REQUEST_DATA":
			return{
				...state,
				isFetching: true
			}
		case "RECEIVE_DATA":
			return{
				...state,
				isFetching: false,
				categories: action.categories
			}
		default:
			return state
	}
}