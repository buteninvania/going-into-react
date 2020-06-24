import axios from "axios";
import {UsersType} from "../Types/types";

export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "4deb8f14-6cf3-406a-968c-ffbe6aebefc3_"},
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

export enum ResaultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


