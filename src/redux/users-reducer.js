import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER = "SET-USER";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_IS_FETCHING = "SET-IS-FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";


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
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize).then(data => {

            dispatch(setIsFetching(false));
            dispatch(setUser(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });

    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setButtonDisable(true, userId));
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(setButtonDisable(false, userId));
        })
    };
}

export const unFollow = (userId) => {
    return (dispatch) => {
        dispatch(setButtonDisable(true, userId));
        usersAPI.unFollow(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(unFollowSuccess(userId));
            }
            dispatch(setButtonDisable(false, userId));
        })
    };
}

    export default userReduser;