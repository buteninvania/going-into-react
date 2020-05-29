import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReduser from "./profile-reduser";
import messageReduser from "./message-reduser";
import userReduser from "./users-reducer";
import authsReduser from "./auths-reduser";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagePage: messageReduser,
    usersPage: userReduser,
    auth: authsReduser,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store;
export default store;
