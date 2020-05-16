import React from 'react';
import m from "./MyPosts.module.css"
import Post from "./Post/Post"


const MyPosts = (props) => {
    let postElements = props.postData.map(m => <Post message={m.message} like={m.like}/>)


     let newPostElement = React.createRef();

     let addPost = () => {
         { props.addPost() }
     };

     let onPostChange = () => {
         let text = newPostElement.current.value;
         {props.updatePostChange(text)};
     }

    return (
        <div className={m.wall}>
            <div className={m.addPost}>
                <h3>My Posts</h3>
                <div><textarea ref={ newPostElement } onChange={onPostChange} value={props.newPostText}></textarea></div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div>
                { postElements }
            </div>
        </div>
    );
}

export default MyPosts;