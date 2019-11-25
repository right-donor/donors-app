import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default'

/** AWS Amplify setup */
import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'

/** Redux imports */
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import StateLoader from './reducers/StateLoader'
import throttle from 'lodash/throttle'

/** Amplify Configuration */
Amplify.configure(awsmobile)

/** Redux Configuration */
const persistedState = StateLoader.loadState()
const loggerMiddleware = createLogger()
const store = createStore(rootReducer, persistedState, applyMiddleware(thunkMiddleware, loggerMiddleware))

store.subscribe(throttle(() => {
    StateLoader.saveState(store.getState())
}, 1000))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
