import {instance, ResaultCodesEnum} from "./api";

type CheckAuthType = {
    data: { id: number, email: string, login: string }
    resultCode: ResaultCodesEnum
    messages: Array<string>
}
type LoginType = {
    data: { UserId: number }
    resultCode: ResaultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
    checkAuth() {
        return instance.get<CheckAuthType>(`auth/me`).then(res => res.data)
    },
}