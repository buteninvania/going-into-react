import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import { PostData, ProfileType, PhotosType } from "../Types/types"
import {profileAPI} from "../api/profile-api"

const initialState = {
    postData: [
        {message: "Hi this is my first post", like: 24, id: 1},
        {message: "Hi this is my first post", like: 2, id: 2},
    ] as Array<PostData>,
    profile: null as ProfileType | null,
    status: "",
    newPostText:"",
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/profile/ADD-POST":
            const newPost = {message: action.newPostText, id: 3, like: 1}
            return {
                ...state,
                postData: [...state.postData, newPost]
            }
        case "ButInProject/profile/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "ButInProject/profile/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "ButInProject/profile/DELETE-POST":
            return {
                ...state,
                postData: state.postData.filter(p => p.id != action.postId)
            }
        case "ButInProject/profile/SAVE-PHOTO-SUCCESS":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: "ButInProject/profile/ADD-POST", newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: "ButInProject/profile/SET-USER-PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "ButInProject/profile/SET-STATUS", status} as const),
    deletePost: (postId: number) => ({type: "ButInProject/profile/DELETE-POST", postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "ButInProject/profile/SAVE-PHOTO-SUCCESS", photos} as const)
}

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch(error) {
        //
    }
}
export const savePhoto = (photo: PhotosType): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(photo)
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("editProfile", {_error: response.messages[0]}))
        return Promise.reject(response.messages[0])
    }
}

export default profileReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>