import { combineReducers } from 'redux';
import {selectCategories, allCategories} from "./participateReducer"
import {manageMyEvents, selectMatchOption, registerFormData} from "./createmanageReducer"


const rootReducer = combineReducers({
	selectCategories,
	allCategories, 
	manageMyEvents,
	selectMatchOption, 
	registerFormData
})

export default rootReducer