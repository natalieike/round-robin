import { loginToDb } from '../actions';

export const loginReducer = (state = { 
	loginStatus: "not connected",
	access_token: "",
	fbUserId: "",
	dbStatus: ""
	}, action) => {
	switch(action.type){
		case "LOGIN":
			console.log(state);
			return {
				...state,
				...action.data,
				loggedIn: true
			}
		case "LOGOUT":
			console.log(state);
			return {
				...state,
				...action.data,
				loggedIn: false
			};
		default:
			return state
	}
};