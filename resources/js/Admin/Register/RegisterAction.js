const REGISTER_MEMBER = 'REGISTER_MEMBER';

import axios from 'axios';

export const register_member = (data) => dispatch => {

    axios.post('/api/member/register', data)
        .then (response => dispatch ({
            type: REGISTER_MEMBER,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });

};