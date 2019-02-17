const LOGIN_ADMIN = 'LOGIN_ADMIN';

import axios from 'axios';

export const login_admin = (login_email, login_password) => dispatch => {

    const params = {
        login_email,
        login_password
    };

    axios.post('/api/admin/login', params)
        .then (response => dispatch ({
            type: LOGIN_ADMIN,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};