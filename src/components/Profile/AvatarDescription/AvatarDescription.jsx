import React from 'react';
import p from "./avatarDescription.module.css";
import Preloader from "../../Preloader/Preloader";


const AvatarDescription = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={p.wallImage}>
                <img alt="CuberPunk"
                     src='https://s1.1zoom.ru/big3/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg'/>
            </div>
            <div className={p.avatar}>
                <img alt="avatar" src={props.profile.photos.large}/>
                <div className={p.discription}>
                    <div className={p.fullName}>{props.profile.fullName}</div>
                    <div className={p.statusUser}>{props.profile.aboutMe}</div>
                    <div className={p.contactsUser}>В контакте: {props.profile.contacts.vk}</div>
                </div>

            </div>
        </div>
    )
}

export default AvatarDescription;