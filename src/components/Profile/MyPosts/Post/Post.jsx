import React from 'react';
import posts from "./Post.module.css";

const Post = (props) => {
    return (
        <div className = {posts.item}>
            <img src="http://img1.joyreactor.cc/pics/post/full/Octokuro-Cyberpunk-2077-%D0%98%D0%B3%D1%80%D1%8B-cosplay-4991721.jpeg" alt=""/>
            <div className = {posts.text}>
                { props.message }
            </div>
            <div className = {posts.like}> { props.like} </div>
        </div>
    );
}

export default Post;