import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/store";


let rerenderIntireThree = (state) => {

    ReactDOM.render(
        <React.StrictMode>
            <App state={state} dispath={store.dispatch.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root'));
}

rerenderIntireThree(store.getState());
store.subscribe(rerenderIntireThree);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
