import {ResaultCodesEnum} from "../api/api"
import {stopSubmit} from "redux-form"
import {authAPI} from "../api/auth-api"
import {securityhAPI} from "../api/security-api"
import {BaseThunkType, InferActionsTypes} from "./redux-store"

let initialState = {
    userId: null as number|null,
    login: null as string|null,
    email: null as string|null,
    isAuth: false,
    captchaUrl:null as string|null,
}

const authsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/auth/SET-USER-DATA":
        case "ButInProject/auth/GET-CAPTCHA-URL":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: "ButInProject/auth/SET-USER-DATA",
        payload: {userId, login, email, isAuth},
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: "ButInProject/auth/GET-CAPTCHA-URL",
        payload: {captchaUrl},
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.checkAuth()
    if (meData.resultCode === ResaultCodesEnum.Success) {
        const {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, login, email, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResaultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResaultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = loginData.messages.length > 0 ? loginData.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityhAPI.getCaptchaUrl()
    const captchaUrl = response.url
    dispatch(actions.setCaptchaUrl(captchaUrl))
}

export default authsReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType< typeof stopSubmit>>