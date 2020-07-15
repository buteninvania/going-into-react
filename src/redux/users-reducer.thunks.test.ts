import {actions, follow, unFollow} from "./users-reducer"
import {usersAPI} from "../api/users-api"
import {ResaultCodesEnum, ResponseDataType} from "../api/api"

jest.mock("../api/users-api")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const resault: ResponseDataType = {
    resultCode: ResaultCodesEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(resault))
usersAPIMock.unFollow.mockReturnValue(Promise.resolve(resault))

test("success follow thunk", async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setButtonDisable(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setButtonDisable(false, 1))
})

test("success UnFollow thunk", async () => {
    const thunk = unFollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setButtonDisable(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setButtonDisable(false, 1))
})