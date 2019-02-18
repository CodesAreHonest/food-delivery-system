const GET_FOOD_ORDER = 'GET_FOOD_ORDER';
const GET_FOOD_DETAIL = 'GET_FOOD_DETAIL';

import axios from 'axios';
import moment from 'moment';

export const get_food_order = (data) => dispatch => {

    const {user_email, limit} = data;

    const order_status = data.status.value;
    const start_date = data.start_date === null ? '' : moment(data.start_date).format('DD-MM-YYYY');
    const end_date = data.end_date === null ? '' : moment(data.end_date).format('DD-MM-YYYY');

    const params = {
        user_email, order_status, start_date, end_date, limit
    };

    axios.get('/api/admin/get/food/order', {params})
        .then (response => dispatch ({
            type: GET_FOOD_ORDER,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};

export const get_food_detail = (id) => dispatch => {

    const params = {
        id, limit: 1
    };

    axios.get('/api/admin/get/food/order', {params})
        .then (response => dispatch ({
            type: GET_FOOD_DETAIL,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};