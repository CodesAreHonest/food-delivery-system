const REGISTER_DELIVERY = 'REGISTER_DELIVERY';
const LOGIN_DELIVERY = 'LOGIN_DELIVERY';

const GET_DELIVERY = 'GET_DELIVERY';
const UPDATE_DELIVERY = 'UPDATE_DELIVERY';


const initialState = {
    register_delivery_response: [],
    login_delivery_response: [],
    update_delivery_response: [],
    get_delivery_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_DELIVERY:
            return {
                ...state,
                register_delivery_response: action.payload
            };
        case LOGIN_DELIVERY:
            return {
                ...state,
                login_delivery_response: action.payload
            };
        case GET_DELIVERY:
            return {
                ...state,
                get_delivery_response: action.payload
            };
        case UPDATE_DELIVERY:
            return {
                ...state,
                update_delivery_response: action.payload
            };
        default:
            return state;
    }
}
