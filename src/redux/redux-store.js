import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReduser from "./profile-reduser";
import messageReduser from "./message-reduser";
import userReduser from "./users-reducer";
import authsReduser from "./auths-reduser";
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagePage: messageReduser,
    usersPage: userReduser,
    auth: authsReduser,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store;
export default store;
