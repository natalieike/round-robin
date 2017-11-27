import { fetchMyManagedEvents } from '../actions';

export const manageMyEvents = (state = { 
		isFetching: false, 
		myManagedEvents: [],
		user: 1 
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
			if(action.myManagedEvents){
				newState.myManagedEvents = action.myManagedEvents;
			}
			return newState;
		default:
			return state
	}
}