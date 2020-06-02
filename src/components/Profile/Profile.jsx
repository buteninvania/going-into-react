import React from 'react';
import AvatarDescription from "./AvatarDescription/AvatarDescription";
import MyPostsContainer from "./MyPosts/MyPostsContainer";




const Profile = (props) => {

    return (
        <div>
            <AvatarDescription profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;