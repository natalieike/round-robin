import { combineReducers } from 'redux';
import {selectCategories, allCategories} from "./participateReducer"
import {manageMyEvents, selectMatchOption, registerFormData} from "./createmanageReducer"
import {loginReducer} from "./homeReducer"

const rootReducer = combineReducers({
	selectCategories,
	allCategories, 
	manageMyEvents,
	selectMatchOption, 
	registerFormData,
	loginReducer
})

export default rootReducer