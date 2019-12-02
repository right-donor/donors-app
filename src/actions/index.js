import { getUser } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export function masterLogin(user) {
    return { type: RECEIVE_LOGIN, user };
}

export const SAVE_USER_EXPLORATION = 'SAVE_USER_EXPLORATION';
export function saveUserExploration(newUser) {
    return { type: SAVE_USER_EXPLORATION, newUser };
}

export const INIT_NEW_PATIENT = 'INIT_NEW_PATIENT';
export const RECEIVE_NEW_PATIENT = 'RECEIVE_NEW_PATIENT';
function initPatient() {
    return { type: INIT_NEW_PATIENT };
}

function receivePatient(user) {
    return { type: RECEIVE_NEW_PATIENT, user };
}

export function patientSaved(userID) {
    return function(dispatch) {
        dispatch(initPatient());

        API.graphql(graphqlOperation(getUser, { id: userID }))
        .then(({ data }) => {
            if (data.getUser) {
                dispatch(receivePatient(data.getUser));
            }
        });
    }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
    return { type: LOGOUT };
}

