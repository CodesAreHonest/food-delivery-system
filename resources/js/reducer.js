import {combineReducers} from 'redux';

import AddFoodReducer from './Restaurant/AddFood/AddFoodReducer';

export default combineReducers({
    food: AddFoodReducer
})