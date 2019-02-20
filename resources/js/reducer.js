import {combineReducers} from 'redux';

import FoodReducer from './reducer/FoodReducer';
import RestaurantReducer from './reducer/RestaurantReducer';
import MemberReducer from './reducer/MemberReducer';
import DeliveryReducer from './reducer/DeliveryReducer';
import CartReducer from "./reducer/CartReducer";
import AdminReducer from "./reducer/AdminReducer";

export default combineReducers({
    food: FoodReducer,
    restaurant: RestaurantReducer,
    member: MemberReducer,
    delivery: DeliveryReducer,
    cart: CartReducer,
    admin: AdminReducer,
})