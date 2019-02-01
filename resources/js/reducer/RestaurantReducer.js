const REGISTER_RESTAURANT = 'REGISTER_RESTAURANT';
const LOGIN_RESTAURANT = 'LOGIN_RESTAURANT';

const initialState = {
    register_restaurant_response: [],
    login_restaurant_response: [],
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
        default:
            return state;
    }
}
