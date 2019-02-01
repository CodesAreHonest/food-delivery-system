import axios from 'axios';

const GET_RESTAURANT_DETAIL = 'GET_RESTAURANT_DETAIL';

export const get_restaurant_detail = () => dispatch => {

    axios.get ('/api/restaurant/detail')
        .then(response => dispatch ({
            type: GET_RESTAURANT_DETAIL,
            payload: response.data.restaurant,
        })).catch(err => {
            console.log(err);
    });

};
