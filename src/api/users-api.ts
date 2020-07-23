import {GetItemsType, instance, ResponseDataType} from "./api";
import {profileAPI} from "./profile-api";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post<ResponseDataType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseDataType>
    },
    getProfile(userId: number) {
        console.warn("Please use profileAPI");
        return profileAPI.getProfile(userId);
    }
}