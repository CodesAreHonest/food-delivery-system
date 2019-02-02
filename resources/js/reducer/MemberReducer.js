const REGISTER_MEMBER       = 'REGISTER_MEMBER';
const LOGIN_MEMBER          = 'LOGIN_MEMBER';
const GET_USER_PROFILE      = 'GET_USER_PROFILE';
const UPDATE_USER_PROFILE   = 'UPDATE_USER_PROFILE';
const UPDATE_USER_LOCATION  = 'UPDATE_USER_LOCATION';


const initialState = {
    register_member_response: [],
    login_member_response: [],
    detail: [],
    update_member_profile_response: [],
    update_member_location_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_MEMBER:
            return {
                ...state,
                register_member_response: action.payload
            };
        case LOGIN_MEMBER:
            return {
                ...state,
                login_member_response: action.payload
            };
        case GET_USER_PROFILE:
            return {
                ...state,
                detail: action.payload
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                update_member_profile_response: action.payload
            };
        case UPDATE_USER_LOCATION:
            return {
                ...state,
                update_member_location_response: action.payload
            };
        default:
            return state;
    }
}
