const GET_ADMIN_LIST = 'GET_ADMIN_LIST';
const GET_ADMIN_DETAIL = 'GET_ADMIN_DETAIL';

const UPDATE_ADMIN_DETAIL = 'UPDATE_ADMIN_DETAIL';

import axios from 'axios';

export const get_admin_detail = () => dispatch => {

    axios.get('/api/admin/detail')
        .then (response => {
            const {admin_detail} = response.data;

            dispatch ({
                type: GET_ADMIN_DETAIL,
                payload: admin_detail,
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

export const update_admin_detail = data => dispatch => {

    const {
        username, password, c_password
    } = data;

    const params = {
        username, password, c_password
    };

    axios.post('/api/admin/update/detail', params)
        .then (response => {

            dispatch ({
                type: UPDATE_ADMIN_DETAIL,
                payload: response,
            });

        }).catch (err => {
        console.warn (err);
    });
};
