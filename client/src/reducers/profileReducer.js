import { getUserData } from '../actions';

export const manageUserData = (state = { 
		firstName: "",
		lastName: "",
		aboutMe: "",
		streetAddress: "",
		city: "",
		email: "",
		postalCode: "",
		shippingPreferenceId: 1,
		stateProvince: "",
		country: ""
	}, action) => {
	switch(action.type){
		case "RECEIVE_PROFILEDATA":
			if(action.shippingPreferenceId){
				action.shippingPreferenceId = parseInt(action.shippingPreferenceId);
			}
			let stateProvince = action.stateProvince['stateProvinceName'];
			let country = action.stateProvince['country'].countryName;
			action.stateProvinceName = stateProvince;
			action.country = country;
			return{
				...state,
				...action
			}
		default:
			return state
	}
}