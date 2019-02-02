const GET_USER_PROFILE = 'GET_USER_PROFILE';

import axios from 'axios';

export const get_user_profile = () => dispatch => {

    axios.get('/api/member/detail')
        .then (response => dispatch ({
            type: GET_USER_PROFILE,
            payload: response.data.member_detail,
        })).catch (err => {
        console.warn (err);
    });
};