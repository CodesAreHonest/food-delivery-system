import axios from 'axios';

const ADD_FOOD = 'ADD_FOOD';

export const add_food = (data) => dispatch => {

    axios ({
        method: "POST",
        url: '/api/restaurant/add/food',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => dispatch ({
        type: ADD_FOOD,
        payload: response,
    })).catch(err => {
        console.log(err);
    });

};