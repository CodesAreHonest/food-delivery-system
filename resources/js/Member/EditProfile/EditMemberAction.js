const GET_USER_PROFILE = 'GET_USER_PROFILE';
const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION';

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

export const post_update_profile = (data) => dispatch => {

    const {
        username,
        password,
        c_password: confirm_password
    } = data;

    const params = {
        username, password, confirm_password
    };

    axios.post('/api/member/update/detail', params)
        .then (response => dispatch ({
            type: UPDATE_USER_PROFILE,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};

export const post_update_location = (data) => dispatch => {

    axios.post('/api/member/update/location', data)
        .then (response => dispatch ({
            type: UPDATE_USER_LOCATION,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};