import { SET_LOGIN } from '../Actions/types';

const LoginReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOGIN: {
            return action.payload;
        }
        default:
            return state;
    }
}

export default LoginReducer;