import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addMessage, addPost, updateMessageChange} from "./redux/state";
import {updatePostChange} from "./redux/state";

export let rerednerIntireThree = (state) => {


    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} addMessage={addMessage} updateMesageChange={updateMessageChange} updatePostChange={updatePostChange} />
        </React.StrictMode>,
        document.getElementById('root'));
}

