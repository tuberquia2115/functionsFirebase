import React from "react";
import firebase from 'firebase'
import firebaseConfig from './config/ConfigFirebase';
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from './app/App'

render(<App />, document.getElementById('root'))

serviceWorker.unregister();
firebase.initializeApp(firebaseConfig);
