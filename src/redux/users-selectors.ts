import {AppStateType} from "./redux-store";

export const getUsersState = (state:AppStateType) => {
    return state.usersPage.users;
}
export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCounts = (state:AppStateType) => {
    return state.usersPage.totalUsersCounts;
}
export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress;
}