import { combineReducers } from 'redux';
import {
    LOGOUT,
    RECEIVE_LOGIN
} from '../actions';


function user(state = null, action) {
    switch(action.type) {
        case RECEIVE_LOGIN:
            return Object.assign({}, state, action.user);
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