const ADD_POST = "ADD-POST";
const UPDATE_POST_CHANGE = "UPDATE-POST-CHANGE";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
    postData: [{message: "Hi this is my first post", like: 24, id:1},
               {message: "Hi this is my first post", like: 24, id:2},],
    newPostText: 'Enter text...',
    profile: null,
};

const profileReduser = (state= initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {message: state.newPostText, id:3, like: 1,};
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: "",
            }
        case UPDATE_POST_CHANGE:
            return {
                ...state,
                newPostText: action.text,
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostChangeActionCreator = (text) => ({type: UPDATE_POST_CHANGE, text: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export default profileReduser;