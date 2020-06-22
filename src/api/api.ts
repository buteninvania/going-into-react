import axios from "axios";
import {ProfileType} from "../Types/types";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "4deb8f14-6cf3-406a-968c-ffbe6aebefc3_"},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn("Please use profileAPI");
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {
            status: status
        })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo/`,formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResaultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}
type CheckAuthType = {
    data: {id: number, email: string, login: string}
    resultCode: ResaultCodesEnum
    messages: Array<string>
}
type LoginType = {
    data: {UserId: number}
    resultCode: ResaultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    login(email: string, password: string, rememberMe=false,captcha: null | string = null) {
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

export const securityhAPI = {
    getCaptchaUrl() {
        return instance.post(`security/get-captcha-url`)
    },
}



