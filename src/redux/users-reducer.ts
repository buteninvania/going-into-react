import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utils/object-helpers";
import { UsersType } from "../Types/types";


const FOLLOW = "ButInProject/users/FOLLOW";
const UNFOLLOW = "ButInProject/users/UNFOLLOW";
const SET_USER = "ButInProject/users/SET-USER";
const SET_CURRENT_PAGE = "ButInProject/users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "ButInProject/users/SET-TOTAL-USERS-COUNT";
const SET_IS_FETCHING = "ButInProject/users/SET-IS-FETCHING";
const FOLLOWING_IN_PROGRESS = "ButInProject/users/FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCounts: 3,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
};
type InitialStateType = typeof initialState;

const userReduser = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            }
        case SET_USER:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCounts: action.totalCount,
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        default:
            return state;
    }
}
type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userID: number,
}
export const followSuccess = (userID:number):FollowSuccessActionType => ({type: FOLLOW, userID})
type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userID: number,
}
export const unFollowSuccess = (userID:number):UnFollowSuccessActionType => ({type: UNFOLLOW, userID})
type SetUserActionType = {
    type: typeof SET_USER,
    users: Array<UsersType>,
}
export const setUser = (users:Array<UsersType>):SetUserActionType => ({type: SET_USER, users})
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number,
}
export const setCurrentPage = (page:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, page})
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount: number
}
export const setTotalUsersCount = (totalCount:number):SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalCount})
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING,
    isFetching: boolean,
}
export const setIsFetching = (isFetching:boolean):SetIsFetchingActionType => ({type: SET_IS_FETCHING, isFetching})
type SetButtonDisableActionType = {
    type: typeof FOLLOWING_IN_PROGRESS,
    followingInProgress: boolean,
    userID: number,
}
export const setButtonDisable = (followingInProgress:boolean, userID:number):SetButtonDisableActionType => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})

export const getUsers = (currentPage:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setIsFetching(false));
        dispatch(setUser(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}
const followUnfollowFlow = async (dispatch:any,userId:number,apiMethod:any,actionCreator:any) => {
    dispatch(setButtonDisable(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setButtonDisable(false, userId));
}
export const follow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}
export const unFollow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess);
    }
}

export default userReduser;