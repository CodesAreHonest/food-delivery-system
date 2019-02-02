const REGISTER_MEMBER = 'REGISTER_MEMBER';
const LOGIN_MEMBER = 'LOGIN_MEMBER';


const initialState = {
    register_member_response: [],
    login_member_response: []
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
        default:
            return state;
    }
}
