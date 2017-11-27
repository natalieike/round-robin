import { combineReducers } from 'redux';
import {selectCategories, allCategories} from "./participateReducer"
import {manageMyEvents} from "./createmanageReducer"


const rootReducer = combineReducers({
	selectCategories,
	allCategories, 
	manageMyEvents
})

export default rootReducer