import React from 'react';
import m from "./MyPosts.module.css"
import Post from "./Post/Post"
import {addPostActionCreator, updatePostChangeActionCreator} from "../../../redux/profile-reduser";



const MyPosts = (props) => {
    let postElements = props.postData.map(m => <Post message={m.message} like={m.like}/>)
    let newPostElement = React.createRef();
    let addPost = () => {
        props.dispath(addPostActionCreator())
    };
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispath(updatePostChangeActionCreator(text))
    };

    return (
        <div className={m.wall}>
            <div className={m.addPost}>
                <h3>My Posts</h3>
                <div><textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea></div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    );
}

export default MyPosts;