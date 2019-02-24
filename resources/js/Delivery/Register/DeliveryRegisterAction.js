const REGISTER_DELIVERY = 'REGISTER_DELIVERY';

import axios from 'axios';

export const register_delivery = (data) => dispatch => {

    const {
        delivery_register_username,
        delivery_name,
        delivery_address,
        delivery_register_password,
        delivery_c_password,
        delivery_com_detail,
    } = data;

    const params = {
        'username': delivery_register_username,
        'name': delivery_name,
        'password': delivery_register_password,
        'confirm_password': delivery_c_password,
        'address': delivery_address,
        'company_description': delivery_com_detail,

    };

    axios.post('/api/delivery/register', params)
        .then (response => dispatch ({
            type: REGISTER_DELIVERY,
            payload: response,
        })).catch (err => {
            console.warn (err);
    });

};