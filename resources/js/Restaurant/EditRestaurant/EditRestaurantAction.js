import axios from 'axios';

const GET_RESTAURANT_DETAIL = 'GET_RESTAURANT_DETAIL';
const UPDATE_RESTAURANT_DETAIL = 'UPDATE_RESTAURANT_DETAIL';

export const get_restaurant_detail = () => dispatch => {

    axios.get ('/api/restaurant/detail')
        .then(response => dispatch ({
            type: GET_RESTAURANT_DETAIL,
            payload: response.data.restaurant,
        })).catch(err => {
            console.log(err);
    });

};

export const update_restaurant_detail = (restaurant_name, address) => dispatch => {

    axios.post ('/api/restaurant/update/profile', {
        restaurant_name, address
    }).then(response => dispatch ({
            type: UPDATE_RESTAURANT_DETAIL,
            payload: response,
        })).catch(err => {
        console.log(err);
    });

    get_restaurant_detail();

};
