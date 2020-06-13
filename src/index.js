import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker'; // PWA (progressive WEB applications)
import ReactDOM from 'react-dom';
import './index.css';
import ButInProjectApp from "./App";

ReactDOM.render(<ButInProjectApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
