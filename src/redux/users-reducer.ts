import {updateObjectInArray} from "../Utils/object-helpers";
import { UsersType } from "../Types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCounts: 3,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
};
type InitialStateType = typeof initialState;

const userReduser = (state = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            }
        case "SET_USER":
            return {...state, users: action.users}
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.page
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCounts: action.totalCount,
            }
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case "FOLLOWING_IN_PROGRESS":
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userID:number) => ({type: 'FOLLOW', userID} as const),
    unFollowSuccess: (userID:number) => ({type: 'UNFOLLOW', userID} as const),
    setUser: (users:Array<UsersType>) => ({type: 'SET_USER', users} as const),
    setCurrentPage: (page:number) => ({type: 'SET_CURRENT_PAGE', page} as const),
    setTotalUsersCount: (totalCount:number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    setIsFetching: (isFetching:boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setButtonDisable: (followingInProgress:boolean, userID:number) => ({
        type: 'FOLLOWING_IN_PROGRESS',
        followingInProgress,
        userID
    } as const)
}

export const getUsers = (currentPage:number, pageSize:number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUser(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (dispatch:Dispatch<ActionsTypes>,userId:number,apiMethod:any, actionCreator:(userId: number) => ActionsTypes) => {
    dispatch(actions.setButtonDisable(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.setButtonDisable(false, userId));
}
export const follow = (userId:number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}
export const unFollow = (userId:number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch:Dispatch<ActionsTypes>) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.unFollowSuccess);
    }
}

export default userReduser;