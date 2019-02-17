const REGISTER_ADMIN = 'REGISTER_ADMIN';

import axios from 'axios';

export const register_admin = (data) => dispatch => {

    const {
        register_username: username,
        register_email: email,
        register_password: password,
        register_c_password: confirm_password
    } = data;

    const params = {
        username, email, password, confirm_password
    };

    axios.post('/api/admin/register', params)
        .then (response => dispatch ({
            type: REGISTER_ADMIN,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });

};