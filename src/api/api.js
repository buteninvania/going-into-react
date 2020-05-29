import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "4deb8f14-6cf3-406a-968c-ffbe6aebefc3"},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    }
}

export const authAPI = {
    checkAuth() {
        return instance.get(`auth/me`)
    },
}



