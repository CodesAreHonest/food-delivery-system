const GET_USERNAME      = 'GET_USERNAME';

import axios from 'axios';

export const get_username = () => dispatch => {

    axios.get('/api/member/username')
        .then (response => dispatch ({
            type: GET_USERNAME,
            payload: response.data,
        })).catch (err => {
        console.warn (err);
    });
};