import React from 'react';
import AvatarDescription from "./AvatarDescription/AvatarDescription";
import MyPostsContainer from "./MyPosts/MyPostsContainer";



const Profile = (props) => {

    return (
        <div>
            <AvatarDescription/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;