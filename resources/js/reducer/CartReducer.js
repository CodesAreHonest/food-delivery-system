const ADD_CART = 'ADD_CART';
const GET_CART = 'GET_CART';
const CART_CHECKOUT = 'CART_CHECKOUT';

const initialState = {
    add_cart_response: [],
    cart_detail: [],
    cart_checkout_response: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state,
                add_cart_response: action.payload
            };
        case GET_CART:
            return {
                ...state,
                cart_detail: action.payload
            };
        case CART_CHECKOUT:
            return {
                ...state,
                cart_checkout_response: action.payload
            };
        default:
            return state;
    }
}
