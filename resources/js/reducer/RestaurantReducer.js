const REGISTER_RESTAURANT = 'REGISTER_RESTAURANT';
const LOGIN_RESTAURANT = 'LOGIN_RESTAURANT';

const GET_RESTAURANT_DETAIL = 'GET_RESTAURANT_DETAIL';
const UPDATE_RESTAURANT_DETAIL = 'UPDATE_RESTAURANT_DETAIL';

const GET_RESTAURANT_FOOD = 'GET_RESTAURANT_FOOD';

const initialState = {
    register_restaurant_response: [],
    login_restaurant_response: [],
    restaurant_detail: [],
    update_restaurant_response: [],
    food_restaurant_list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_RESTAURANT:
            return {
                ...state,
                register_restaurant_response: action.payload
            };
        case LOGIN_RESTAURANT:
            return {
                ...state,
                login_restaurant_response: action.payload
            };
        case GET_RESTAURANT_DETAIL:
            return {
                ...state,
                restaurant_detail: action.payload
            };
        case UPDATE_RESTAURANT_DETAIL:
            return {
                ...state,
                update_restaurant_response: action.payload
            };
        case GET_RESTAURANT_FOOD:
            return {
                ...state,
                food_restaurant_list: action.payload
            };
        default:
            return state;
    }
}
