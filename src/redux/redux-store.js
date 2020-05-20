import {combineReducers, createStore} from "redux";
import profileReduser from "./profile-reduser";
import messageReduser from "./message-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    messagePage: messageReduser,
});

let store = createStore(reducers);

export default store;