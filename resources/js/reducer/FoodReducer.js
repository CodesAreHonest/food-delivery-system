const ADD_FOOD = 'ADD_FOOD';
const ADD_FOOD_PREVIEW = 'ADD_FOOD_PREVIEW';

const initialState = {
    add_food_response: [],
    add_food_preview_response: [],
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
        default:
            return state;
    }
}
