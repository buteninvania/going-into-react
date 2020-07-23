import {instance, ResponseDataType} from "./api"

export const authAPI = {
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseDataType<LoginType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
    checkAuth() {
        return instance.get<ResponseDataType<CheckAuthDataType>>(`auth/me`).then(res => res.data)
    },
}

type CheckAuthDataType = {
    id: number
    email: string
    login: string
}
type LoginType = {
    UserId: number
}