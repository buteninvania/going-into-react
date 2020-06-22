import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import profileReduser from "./profile-reduser"
import messageReduser from "./message-reduser"
import userReduser from "./users-reducer"
import authsReduser from "./auths-reduser"
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from "redux-thunk"
import appReducer from "./app-reduser"

let rootReducer = combineReducers({
    profilePage: profileReduser,
    messagePage: messageReduser,
    usersPage: userReduser,
    auth: authsReduser,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes <T extends {[key: string]: (...args:any[])=>any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// @ts-ignore
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
export default store
