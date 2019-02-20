const LOGIN_ADMIN       = 'LOGIN_ADMIN';
const REGISTER_ADMIN    = 'REGISTER_ADMIN';
const GET_FOOD_ORDER    = 'GET_FOOD_ORDER';
const GET_FOOD_DETAIL   = 'GET_FOOD_DETAIL';
const GET_ADMIN_LIST    = 'GET_ADMIN_LIST';
const GET_ADMIN_DETAIL  = 'GET_ADMIN_DETAIL';
const UPDATE_ADMIN_DETAIL  = 'UPDATE_ADMIN_DETAIL';

const initialState = {
    login_admin_response: [],
    register_admin_response: [],
    food_order: [],
    food_detail: [],
    list: [],
    detail: [],
    update_admin_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ADMIN:
            return {
                ...state,
                login_admin_response: action.payload
            };
        case REGISTER_ADMIN:
            return {
                ...state,
                register_admin_response: action.payload
            };
        case GET_FOOD_ORDER:
            return {
                ...state,
                food_order: action.payload
            };
        case GET_FOOD_DETAIL:
            return {
                ...state,
                food_detail: action.payload
            };
        case GET_ADMIN_LIST:
            return {
                ...state,
                list: action.payload
            };
        case GET_ADMIN_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case UPDATE_ADMIN_DETAIL:
            return {
                ...state,
                update_admin_response: action.payload
            };
        default:
            return state;
    }
}
