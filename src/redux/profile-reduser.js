const ADD_POST = "ADD-POST";
const UPDATE_POST_CHANGE = "UPDATE-POST-CHANGE";

let initialState = {
    postData: [{message: "Hi this is my first post", like: "24"},
               {message: "Hi this is my first post", like: "24"},],
    newPostText: 'Enter text...',
};

const profileReduser = (state= initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {message: state.newPostText, like: "1",};
            state.postData.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_POST_CHANGE:
            state.newPostText = action.text;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostChangeActionCreator = (text) => ({type: UPDATE_POST_CHANGE, text: text})

export default profileReduser;