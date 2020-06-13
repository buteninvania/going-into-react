import {authAPI, securityhAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "ButInProject/auth/SET-USER-DATA";
const SET_CAPTCHA_URL = "ButInProject/auth/GET-CAPTCHA-URL";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl:null,
};

const authsReduser = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
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

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl},
})

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.checkAuth();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }

}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityhAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}



export default authsReduser;