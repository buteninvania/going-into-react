import {combineReducers, createStore} from "redux";
import profileReduser from "./profile-reduser";
import messageReduser from "./message-reduser";
import userReduser from "./users-reducer";
import authsReduser from "./auths-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagePage: messageReduser,
    usersPage: userReduser,
    auth: authsReduser,
});

let store = createStore(reducers);
window.store=store;
export default store;
