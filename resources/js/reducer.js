import {combineReducers} from 'redux';

import FoodReducer from './reducer/FoodReducer';
import RestaurantReducer from './reducer/RestaurantReducer';
import MemberReducer from './reducer/MemberReducer';
import CartReducer from "./reducer/CartReducer";

export default combineReducers({
    food: FoodReducer,
    restaurant: RestaurantReducer,
    member: MemberReducer,
    cart: CartReducer
})