const LOGIN_DELIVERY = 'LOGIN_DELIVERY';

import axios from 'axios';

export const login_delivery = (data) => dispatch => {

    const {
        delivery_username,
        delivery_password,
    } = data;

    const params = {
        'username': delivery_username,
        'password': delivery_password,
    };

    axios.post('/api/delivery/login', params)
        .then (response => dispatch ({
            type: LOGIN_DELIVERY,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};