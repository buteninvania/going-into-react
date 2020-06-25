import profileReducer, {actions} from "./profile-reducer"
import {ProfileType} from "../Types/types"

const state = {
            postData: [
                {message: "Hi this is my first post", like: 24, id: 1},
                {message: "Hi this is my first post", like: 24, id: 2},
            ],
            profile: null as ProfileType | null,
            status: "",
            newPostText:"",
}

const action = actions.addPostActionCreator("Butenin Ivan")

test('whether post was added', () => {
    const newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(3)
})
test('is this message accurate', () => {
    const newState = profileReducer(state, action)
    expect(newState.postData[2].message).toBe('Butenin Ivan')
})
test('After clicking, the number of messages should decrease.', () => {
    const action = actions.deletePost(1)
    const newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(1)
})
