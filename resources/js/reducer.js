import {combineReducers} from 'redux';

import FoodReducer from './reducer/FoodReducer';
import RestaurantReducer from './reducer/RestaurantReducer';
import MemberReducer from './reducer/MemberReducer';

export default combineReducers({
    food: FoodReducer,
    restaurant: RestaurantReducer,
    member: MemberReducer
})