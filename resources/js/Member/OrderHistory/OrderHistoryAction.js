const ORDER_SUMMARY = 'ORDER_SUMMARY';

import axios from 'axios';

export const order_summary = (data) => dispatch => {

    const delivery_status = data.delivery.value;
    const start_date = data.start_date === null ? '' : data.start_date;
    const end_date = data.end_date === null ? '' : data.end_date;
    const {search} = data;

    const params = {
        delivery_status, start_date,
        end_date, search
    };

    axios.get('/api/member/order/summary', {params})
        .then (response => dispatch ({
            type: ORDER_SUMMARY,
            payload: response.data,
        })).catch (err => {
        console.warn (err);
    });
};