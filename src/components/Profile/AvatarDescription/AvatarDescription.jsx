import React from 'react';
import p from "./avatarDescription.module.css";
import Preloader from "../../commons/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import urlPhoto from "./../../commons/img/computer-icons-user-profile-clip-art-png-favpng-5c0bJPDhifwVUMpsCcT9yXUJw.jpg";


const AvatarDescription = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={p.wallImage}>
                <img alt="CuberPunk"
                     src='https://s1.1zoom.ru/big3/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg'/>
            </div>
            <div className={p.avatar}>
                <div>
                    <img alt="avatar" src={props.profile.photos.large || urlPhoto}/>
                    {props.isOwner && <input className={p.addPhoto} type={"file"} onChange={onMainPhotoSelected}/>}
                </div>
                <div className={p.discription}>
                    <div className={p.fullName}>{props.profile.fullName}</div>
                    <div><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} /></div>
                    <div className={p.contactsUser}>В контакте: {props.profile.contacts.vk}</div>
                </div>

            </div>
        </div>
    )
}

export default AvatarDescription;