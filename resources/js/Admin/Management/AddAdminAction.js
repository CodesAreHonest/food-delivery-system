const ADD_ADMIN = 'ADD_ADMIN';
const GET_ADMIN_LIST = 'GET_ADMIN_LIST';

import axios from 'axios';

export const add_admin = data => dispatch => {

    axios.post('/api/admin/add', data)
        .then (response => {

            dispatch ({
                type: ADD_ADMIN,
                payload: response,
            });

        }).catch (err => {
        console.warn (err);
    });
};

export const get_admin_list = (user_id = '') => dispatch => {

    const params = {
        user_id,
    };

    axios.get('/api/admin/list', {params})
        .then (response => {
            const {admin_list} = response.data;

            dispatch ({
                type: GET_ADMIN_LIST,
                payload: admin_list,
            });

        }).catch (err => {
        console.warn (err);
    });
};