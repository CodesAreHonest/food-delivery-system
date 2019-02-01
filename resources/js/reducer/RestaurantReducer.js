const REGISTER_RESTAURANT = 'REGISTER_RESTAURANT';
const LOGIN_RESTAURANT = 'LOGIN_RESTAURANT';

const GET_RESTAURANT_DETAIL = 'GET_RESTAURANT_DETAIL';

const initialState = {
    register_restaurant_response: [],
    login_restaurant_response: [],
    restaurant_detail: [],
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
        default:
            return state;
    }
}
