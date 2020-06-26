import React from "react"
import f from "./friends.module.css"
import FriendsItem from "./FriendsItem/FriendsItem"

const Friends: React.FC = () => {
    return (
        <div className={f.friendsNav}>
            <h2>My Friends</h2>
            <div className={f.friendsItem}>

            </div>
        </div>
    );
}

export default Friends
