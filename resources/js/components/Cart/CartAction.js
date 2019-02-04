const GET_CART = 'GET_CART';

import axios from 'axios';

export const get_cart = () => dispatch => {

    axios.get('api/member/get/cart')
        .then(response => dispatch ({
            type: GET_CART,
            payload: response
        }))
        .catch (err => {
            console.warn (err);
        })

};