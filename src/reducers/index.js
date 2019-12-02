import { combineReducers } from 'redux';
import {
    LOGOUT,
    RECEIVE_LOGIN,
    SAVE_USER_EXPLORATION,
    RECEIVE_NEW_PATIENT
} from '../actions';


function user(state = null, action) {
    switch (action.type) {
        case RECEIVE_LOGIN:
            return Object.assign({}, state, action.user);
        case SAVE_USER_EXPLORATION:
            return Object.assign({}, state, action.newUser);
        case RECEIVE_NEW_PATIENT:
            return Object.assign({}, state, user);
        default:
            return state;
    }
}

const appReducer = combineReducers({
    user
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
}

export default rootReducer;