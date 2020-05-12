import React from 'react';
import m from "./MyPosts.module.css"
import Post from "./Post/Post"

const MyPosts = () => {
    return (
        <div className={m.wall}>
            
            <div className = {m.addPost}>
                <div>My Posts</div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className = {m.posts}>
            <Post message = 'Hi this is my first post' like = '24' />
            <Post message = 'How are you?' like = '2' />
            </div>
        </div>
    );
}

export default MyPosts;