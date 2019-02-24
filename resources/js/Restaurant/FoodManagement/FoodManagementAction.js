const GET_RESTAURANT_FOOD = 'GET_RESTAURANT_FOOD';

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