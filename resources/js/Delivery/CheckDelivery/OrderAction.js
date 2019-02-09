import axios from 'axios';

const GET_DELIVERY_LIST = 'GET_DELIVERY_LIST';
const UPDATE_ORDER_LIST = 'UPDATE_ORDER_LIST';

export const get_delivery_list_detail = () => dispatch => {

    axios.get ('/api/delivery/get/delivery/list')
        .then(response => dispatch ({
            type: GET_DELIVERY_LIST,
            payload: response,
        })).catch(err => {
            console.log(err);
    });

};

export const update_order_list = (id,status) => dispatch => {


    const params = {
        'order_id': id,
        'delivery_status': status,
    };

    axios.post ('/api/delivery/delivery/order/update', params)
    .then(response => dispatch ({
            type: UPDATE_ORDER_LIST,
            payload: response,
        })).catch(err => {
        console.log(err);
    });

};
