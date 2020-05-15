import React from 'react';
import i from './friends.module.css'

const FriendsItem = (props) => {
    return (
        <div className={i.item}>
            <img src={props.img} alt="daria"/>
        </div>
    )

}

export default FriendsItem;