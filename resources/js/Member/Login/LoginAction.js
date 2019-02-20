const LOGIN_MEMBER = 'LOGIN_MEMBER';

import axios from 'axios';

export const login_member = (email, password) => dispatch => {

    const params = { email, password };

    axios.post('/api/member/login', params)
        .then (response => dispatch ({
            type: LOGIN_MEMBER,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};