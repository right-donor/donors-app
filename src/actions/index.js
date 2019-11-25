export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

function requestLogIn() {
    return { type: REQUEST_LOGIN };
}

function receiveLogin(user) {
    return { type: RECEIVE_LOGIN, user };
}

export function masterLogin(user) {
    return { type: RECEIVE_LOGIN, user };
}

export const LOGOUT = 'LOGOUT'; 

export function logout() {
    return { type: LOGOUT };
}

