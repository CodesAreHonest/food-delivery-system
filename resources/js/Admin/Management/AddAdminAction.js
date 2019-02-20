const UPDATE_ADMIN_DETAIL = 'UPDATE_ADMIN_DETAIL';

import axios from 'axios';

export const update_admin_detail = data => dispatch => {

    const {
        email, password, c_password
    } = data;

    const params = {
        email, password, c_password
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