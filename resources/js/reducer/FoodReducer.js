const ADD_FOOD = 'ADD_FOOD';
const ADD_FOOD_PREVIEW = 'ADD_FOOD_PREVIEW';

const GET_FOOD_MENU = 'GET_FOOD_MENU';

const initialState = {
    add_food_response: [],
    add_food_preview_response: [],
    food_detail: [],
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
        default:
            return state;
    }
}
