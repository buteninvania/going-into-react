import React from 'react';
import m from "./MyPosts.module.css"
import Post from "./Post/Post"


const MyPosts = (props) => {
    let postElements = props.postData.map(m => <Post message={m.message} like={m.like}/>)

    return (
        <div className={m.wall}>
            <div className={m.addPost}>
                <h3>My Posts</h3>
                <div><textarea></textarea></div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={m.posts}>
                { postElements }
            </div>
        </div>
    );
}

export default MyPosts;