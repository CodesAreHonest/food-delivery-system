import axios from 'axios';

const GET_DELIVERY = 'GET_DELIVERY';
const UPDATE_DELIVERY = 'UPDATE_DELIVERY';

export const get_delivery_detail = () => dispatch => {

    axios.get ('/api/delivery/get/detail')
        .then(response => dispatch ({
            type: GET_DELIVERY,
            payload: response.data.delivery,
        })).catch(err => {
            console.log(err);
    });

};

export const update_delivery_detail = (name,delivery_address,delivery_description) => dispatch => {


    const params = {
        'delivery_name': name,
        'address': delivery_address,
        'description': delivery_description,
    };

    axios.post ('/api/delivery/update', params)
    .then(response => dispatch ({
            type: UPDATE_DELIVERY,
            payload: response,
        })).catch(err => {
        console.log(err);
    });

    get_delivery_detail();

};
