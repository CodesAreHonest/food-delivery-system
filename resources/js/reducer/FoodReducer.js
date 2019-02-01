const ADD_FOOD = 'ADD_FOOD';

const initialState = {
    add_food_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD:
            return {
                ...state,
                add_food_response: action.payload
            };
        default:
            return state;
    }
}
