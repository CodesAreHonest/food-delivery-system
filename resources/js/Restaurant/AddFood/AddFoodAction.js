import axios from 'axios';

const ADD_FOOD = 'ADD_FOOD';
const ADD_FOOD_PREVIEW = 'ADD_FOOD_PREVIEW';

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

export const add_food_preview = (data) => dispatch => {

    axios ({
        method: "POST",
        url: '/api/restaurant/add/food/preview',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => dispatch ({
        type: ADD_FOOD_PREVIEW,
        payload: response,
    })).catch(err => {
        console.log(err);
    });

};