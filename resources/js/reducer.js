import {combineReducers} from 'redux';

import FoodReducer from './reducer/FoodReducer';
import RestaurantReducer from './reducer/RestaurantReducer';

export default combineReducers({
    food: FoodReducer,
    restaurant: RestaurantReducer
})