const REGISTER_RESTAURANT = 'REGISTER_RESTAURANT';

import axios from 'axios';

export const register_restaurant = (data) => dispatch => {

    const {
        register_username,
        register_restaurant_name,
        register_password,
        register_c_password,
        register_address
    } = data;

    const params = {
        'restaurant_id': register_username,
        'restaurant_name': register_restaurant_name,
        'password': register_password,
        'confirm_password': register_c_password,
        'register_address': register_address,
    };

    axios.post('/api/restaurant/register', params)
        .then (response => dispatch ({
            type: REGISTER_RESTAURANT,
            payload: response,
        })).catch (err => {
            console.warn (err);
    });

};