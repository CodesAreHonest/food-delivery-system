const LOGIN_RESTAURANT = 'LOGIN_RESTAURANT';

import axios from 'axios';

export const login_restaurant = (data) => dispatch => {

    const {
        restaurant_id,
        restaurant_password,
    } = data;

    const params = {
        'restaurant_id': restaurant_id,
        'password': restaurant_password,
    };

    axios.post('/api/restaurant/login', params)
        .then (response => dispatch ({
            type: LOGIN_RESTAURANT,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};