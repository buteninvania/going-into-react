import React from 'react';
import p from "./profile.module.css";
import MyPosts from './MyPosts/MyPosts';
import AvatarDescription from "./AvatarDescription/AvatarDescription";



const Content = (props) => {

    return (
        <div>
            <AvatarDescription/>
            <MyPosts postData = {props.state.postData}/>
        </div>
    );
}

export default Content;