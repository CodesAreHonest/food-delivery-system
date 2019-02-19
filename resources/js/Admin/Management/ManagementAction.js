const GET_ADMIN_LIST = 'GET_ADMIN_LIST';
const GET_ADMIN_DETAIL = 'GET_ADMIN_DETAIL';

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
        limit: 10
    };

    axios.get('/api/admin/list', {params})
        .then (response => {
            const {admin_list} = response.data;

            dispatch ({
                type: GET_ADMIN_DETAIL,
                payload: admin_list,
            });

        }).catch (err => {
        console.warn (err);
    });
};