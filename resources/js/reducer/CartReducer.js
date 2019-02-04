const ADD_CART = 'ADD_CART';
const GET_CART = 'GET_CART';

const initialState = {
    add_cart_response: [],
    cart_detail: [],
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
        default:
            return state;
    }
}
