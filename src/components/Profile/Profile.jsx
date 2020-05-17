import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import AvatarDescription from "./AvatarDescription/AvatarDescription";



const Profile = (props) => {

    return (
        <div>
            <AvatarDescription/>
            <MyPosts postData = {props.state.postData}
                     newPostText = {props.state.newPostText}
                     dispath={props.dispath} />
        </div>
    );
}

export default Profile;