import profileReduser, {addPostActionCreator, deletePost} from "./profile-reduser";
import React from "react";


let state = {
    postData: [{message: "Hi this is my first post", like: 24, id: 1},
        {message: "Hi this is my first post", like: 24, id: 2},],
};
let action = addPostActionCreator("Butenin Ivan");


test('whether post was added', () => {
    let newState = profileReduser(state, action);
    expect(newState.postData.length).toBe(3);
});

test('is this message accurate', () => {
    let newState = profileReduser(state, action);
    expect(newState.postData[2].message).toBe('Butenin Ivan');
});
test('After clicking, the number of messages should decrease.', () => {
    let action = deletePost(1);
    let newState = profileReduser(state, action);
    expect(newState.postData.length).toBe(1);
});
