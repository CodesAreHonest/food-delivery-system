const GET_RESTAURANT_FOOD = 'GET_RESTAURANT_FOOD';
const ADD_FOOD = 'ADD_FOOD';
const DELETE_FOOD = 'DELETE_FOOD';
const UPDATE_FOOD = 'UPDATE_FOOD';
const ADD_FOOD_PREVIEW = 'ADD_FOOD_PREVIEW';
const GET_FOOD_DETAIL = 'GET_FOOD_DETAIL';

import axios from 'axios';

export const get_restaurant_food = (search_text, category) => async dispatch => {

    const params = {
        search_text,
        category,
        page: 1,
        limit: 10,
    };

    await axios.get('/api/restaurant/get/food', {params})
        .then (response => dispatch ({
            type: GET_RESTAURANT_FOOD,
            payload: response.data.food_list
        }))
        .catch (err => {
            console.warn (err);
        })
};

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

export const delete_food = (id) => async dispatch => {

    const params = {food_id: id};

    await axios.delete('/api/restaurant/delete/food', {params})
        .then(response => dispatch ({
            type: DELETE_FOOD,
            payload: response,
        }))
        .catch(err => {
            console.log(err);
        });
};

export const update_food = (data) => async dispatch => {

    axios ({
        method: "POST",
        url: '/api/restaurant/update/food',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => dispatch ({
        type: UPDATE_FOOD,
        payload: response,
    })).catch(err => {
        console.log(err);
    });

};

export const add_food_preview = (data) => async dispatch => {

    await axios ({
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

export const get_food_detail = (food_id) => async dispatch => {

    const params = {
        food_id
    };

    await axios.get('/api/restaurant/food/detail', {params})
        .then(response => dispatch ({
            type: GET_FOOD_DETAIL,
            payload: response.data.food_detail,
        })).catch(err => {
            console.log(err);
        });

};