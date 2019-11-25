import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default'
import Landingpage from './components/Landingpage';


/** AWS Amplify setup */
import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'

/** Amplify Configuration */
Amplify.configure(awsmobile)

ReactDOM.render(<Landingpage/>, document.getElementById('root'));//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
