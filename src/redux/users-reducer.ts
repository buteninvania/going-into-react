import {updateObjectInArray} from "../Utils/object-helpers"
import { UsersType } from "../Types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {Dispatch} from "redux"
import {usersAPI} from "../api/users-api"

const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCounts: 3,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "ButInProject/users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            }
        case "ButInProject/users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            }
        case "ButInProject/users/SET_USER":
            return {...state, users: action.users}
        case "ButInProject/users/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.page
            }
        case "ButInProject/users/SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCounts: action.totalCount,
            }
        case "ButInProject/users/SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case "ButInProject/users/FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userID: number) => ({type: "ButInProject/users/FOLLOW", userID} as const),
    unFollowSuccess: (userID: number) => ({type: "ButInProject/users/UNFOLLOW", userID} as const),
    setUser: (users: Array<UsersType>) => ({type: "ButInProject/users/SET_USER", users} as const),
    setCurrentPage: (page: number) => ({type: "ButInProject/users/SET_CURRENT_PAGE", page} as const),
    setTotalUsersCount: (totalCount: number) => ({type: "ButInProject/users/SET_TOTAL_USERS_COUNT", totalCount} as const),
    setIsFetching: (isFetching: boolean) => ({type: "ButInProject/users/SET_IS_FETCHING", isFetching} as const),
    setButtonDisable: (followingInProgress: boolean, userID: number) => ({
        type: "ButInProject/users/FOLLOWING_IN_PROGRESS",
        followingInProgress,
        userID
    } as const)
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.setButtonDisable(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.setButtonDisable(false, userId))
}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUser(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.unFollowSuccess)
    }
}

export default userReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>