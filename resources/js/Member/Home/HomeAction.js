const GET_FOOD_MENU = 'GET_FOOD_MENU';

import axios from 'axios';

export const get_food_menu = (data) => dispatch => {

    const {
        page,
        limit,
        search: search_text
    } = data;

    const category = data.category.value;

    const params = {
        page,
        limit,
        category,
        search_text
    };

    axios.get('/api/member/get/food', {params})
        .then (response => dispatch ({
            type: GET_FOOD_MENU,
            payload: response.data.food_list,
        })).catch (err => {
        console.warn (err);
    });
};