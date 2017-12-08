import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {selectCategories, allCategories} from "./participateReducer";
import {manageMyEvents, selectMatchOption, registerFormData} from "./createmanageReducer";
import {loginReducer} from "./homeReducer";
import {manageUserData} from "./profileReducer";

const rootReducer = combineReducers({
	selectCategories,
	allCategories, 
	manageMyEvents,
	selectMatchOption, 
	registerFormData,
	loginReducer,
  form: formReducer,
  manageUserData
})

export default rootReducer