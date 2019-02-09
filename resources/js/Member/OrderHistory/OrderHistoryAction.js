const ORDER_SUMMARY = 'ORDER_SUMMARY';
const ORDER_RECEIVED = 'ORDER_RECEIVED';

import axios from 'axios';
import moment from 'moment';

export const order_summary = (data) => dispatch => {

    const delivery_status = data.delivery.value;
    const start_date = data.start_date === null ? '' : moment(data.start_date).format('DD-MM-YYYY');
    const end_date = data.end_date === null ? '' : moment(data.end_date).format('DD-MM-YYYY');
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

export const order_received = (id) => dispatch => {

    const params = {item_id: id};

    axios.post('/api/member/order/received', params)
        .then (response => dispatch ({
            type: ORDER_RECEIVED,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};