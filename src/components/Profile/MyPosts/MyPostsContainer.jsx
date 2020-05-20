import React from 'react';
import {addPostActionCreator, updatePostChangeActionCreator} from "../../../redux/profile-reduser";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        onPostChange: (text) => {
            dispatch(updatePostChangeActionCreator(text))
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        },

    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;