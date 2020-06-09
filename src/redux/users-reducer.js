import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../Utils/object-helpers";

const FOLLOW = "ButInProject/users/FOLLOW";
const UNFOLLOW = "ButInProject/users/UNFOLLOW";
const SET_USER = "ButInProject/users/SET-USER";
const SET_CURRENT_PAGE = "ButInProject/users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "ButInProject/users/SET-TOTAL-USERS-COUNT";
const SET_IS_FETCHING = "ButInProject/users/SET-IS-FETCHING";
const FOLLOWING_IN_PROGRESS = "ButInProject/users/FOLLOWING_IN_PROGRESS";


let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCounts: 3,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const userReduser = (state = initialState, action) => {

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
export const followSuccess = (userID) => ({type: FOLLOW, userID})
export const unFollowSuccess = (userID) => ({type: UNFOLLOW, userID})
export const setUser = (users) => ({type: SET_USER, users})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setButtonDisable = (followingInProgress, userID) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userID
})

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setIsFetching(false));
        dispatch(setUser(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch,userId,apiMethod,actionCreator) => {
    dispatch(setButtonDisable(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setButtonDisable(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unFollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess);
    }
}

export default userReduser;