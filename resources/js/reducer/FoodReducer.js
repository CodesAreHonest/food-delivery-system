const ADD_FOOD = 'ADD_FOOD';
const ADD_FOOD_PREVIEW = 'ADD_FOOD_PREVIEW';

const DELETE_FOOD = 'DELETE_FOOD';
const UPDATE_FOOD = 'UPDATE_FOOD';

const GET_FOOD_MENU  = 'GET_FOOD_MENU';
const GET_FOOD_DETAIL  = 'GET_FOOD_DETAIL';

const initialState = {
    add_food_response: [],
    add_food_preview_response: [],

    food_detail: [],
    food_information: [],

    delete_food_response: [],
    update_food_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD:
            return {
                ...state,
                add_food_response: action.payload
            };
        case ADD_FOOD_PREVIEW:
            return {
                ...state,
                add_food_preview_response: action.payload
            };
        case GET_FOOD_MENU:
            return {
                ...state,
                food_detail: action.payload
            };
        case DELETE_FOOD:
            return {
                ...state,
                delete_food_response: action.payload
            };
        case GET_FOOD_DETAIL:
            return {
                ...state,
                food_information: action.payload
            };
        case UPDATE_FOOD:
            return {
                ...state,
                update_food_response: action.payload
            };
        default:
            return state;
    }
}
