import userReducer, {actions, InitialStateType} from './users-reducer'
let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: "Ivan 0", followed: false,
                photos: {small: null, large: null}, status: "status 0"
            },
            {
                id: 1, name: "Ivan 1", followed: false,
                photos: {small: null, large: null}, status: "status 0"
            },
            {
                id: 2, name: "Ivan 2", followed: true,
                photos: {small: null, large: null}, status: "status 0"
            },
            {
                id: 3, name: "Ivan 3", followed: true,
                photos: {small: null, large: null}, status: "status 0"
            },
        ],
        pageSize: 5,
        totalUsersCounts: 3,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    }
})

test("Follow success", () => {
    const newState = userReducer(state, actions.followSuccess(0))
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeFalsy()
})
test("UnFollow success", () => {
    const newState = userReducer(state, actions.unFollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeFalsy()
})