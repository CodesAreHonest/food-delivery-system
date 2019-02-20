const GET_CART = 'GET_CART';
const CART_CHECKOUT = 'CART_CHECKOUT';

import axios from 'axios';

export const get_cart = () => dispatch => {

    axios.get('/api/member/get/cart')
        .then(response => dispatch ({
            type: GET_CART,
            payload: response
        }))
        .catch (err => {
            console.warn (err);
        })
};

export const check_out = () => dispatch => {

    axios.post('/api/member/cart/checkout')
        .then(response => dispatch ({
            type: CART_CHECKOUT,
            payload: response,
        }))
        .catch (err => {
            console.warn (err);
        })
};