const LOGIN_ADMIN = 'LOGIN_ADMIN';


const initialState = {
    login_admin_response: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ADMIN:
            return {
                ...state,
                login_admin_response: action.payload
            };
        default:
            return state;
    }
}
