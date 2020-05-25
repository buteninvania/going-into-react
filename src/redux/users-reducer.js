const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER = "SET-USER";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_IS_FETCHING = "SET-IS-FETCHING";


let initialState = {
    users:[],
    pageSize: 100,
    totalUsersCounts: 3,
    currentPage: 1,
    isFetching: false,
};

const userReduser = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, follow: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, follow: false}
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
        default:
            return state;
    }
}
export const follow = (userID) => ({type: FOLLOW, userID})
export const unFollow = (userID) => ({type: UNFOLLOW, userID})
export const setUser = (users) => ({type: SET_USER, users})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})



export default userReduser;