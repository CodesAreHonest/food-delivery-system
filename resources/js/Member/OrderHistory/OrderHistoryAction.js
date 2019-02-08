const ORDER_SUMMARY = 'ORDER_SUMMARY';

import axios from 'axios';

export const order_summary = () => dispatch => {

    axios.get('/api/member/order/summary')
        .then (response => dispatch ({
            type: ORDER_SUMMARY,
            payload: response.data,
        })).catch (err => {
        console.warn (err);
    });
};