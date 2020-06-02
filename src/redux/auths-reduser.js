import {authAPI} from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";


let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
};

const authsReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth},
})


export const getAuthUserData = () =>
    (dispatch) => {
        authAPI.checkAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    dispatch(setAuthUserData(id, login, email, true));
                }
            });
    }

export const login = (email, password, rememberMe) =>
    (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {debugger;
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            });
    }

export const logout = () =>
    (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
    }


export default authsReduser;