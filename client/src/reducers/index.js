import { combineReducers } from 'redux';
import {selectCategories, allCategories} from "./participateReducer"


const rootReducer = combineReducers({
	selectCategories,
	allCategories
})

export default rootReducer