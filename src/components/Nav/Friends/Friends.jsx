import React from 'react';
import f from './friends.module.css'
import FriendsItem from "./FriendsItem/FriendsItem";

const Friends = (props) => {

    let friendsItems = props.friendsUrl.map(f => (<FriendsItem img={f.urlImg}/>))

    return (
        <div className={f.friendsNav}>
            <h2>My Friends</h2>
            <div className={f.friendsItem}>
                {friendsItems}
            </div>
        </div>
    );
}

export default Friends;