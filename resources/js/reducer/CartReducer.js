const ADD_CART = 'ADD_CART';
const GET_CART = 'GET_CART';
const CART_CHECKOUT = 'CART_CHECKOUT';
const ORDER_SUMMARY = 'ORDER_SUMMARY';
const ORDER_RECEIVED = 'ORDER_RECEIVED';

const initialState = {
    add_cart_response: [],
    cart_detail: [],
    cart_checkout_response: [],
    order_summary_detail: [],
    order_received_response: [],
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
        case ORDER_SUMMARY:
            return {
                ...state,
                order_summary_detail: action.payload
            };
        case ORDER_RECEIVED:
            return {
                ...state,
                order_received_response: action.payload
            };
        default:
            return state;
    }
}
