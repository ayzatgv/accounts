import { SET_LOGIN } from './types';

export const setLogin = (payload) => {
    return {
        type: SET_LOGIN,
        payload
    }
}
