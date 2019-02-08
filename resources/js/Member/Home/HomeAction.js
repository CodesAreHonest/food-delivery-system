const GET_FOOD_MENU = 'GET_FOOD_MENU';
const ADD_CART = 'ADD_CART';

import axios from 'axios';
import {get_cart} from "../../components/Cart/CartAction";

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

export const add_cart = (data) => dispatch => {

    const {food_id, quantity, food_price} = data;

    const params = {food_id, quantity, food_price};

    axios.post('/api/member/add/cart', params)
        .then (response => dispatch ({
            type: ADD_CART,
            payload: response,
        })).catch (err => {
        console.warn (err);
    });
};