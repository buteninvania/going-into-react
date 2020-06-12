import React, {useState} from 'react';
import p from "./avatarDescription.module.css";
import Preloader from "../../commons/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import urlPhoto
    from "./../../commons/img/computer-icons-user-profile-clip-art-png-favpng-5c0bJPDhifwVUMpsCcT9yXUJw.jpg";
import ProfileDataForm from "./ProfileDataForm";

const AvatarDescription = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (FormData) => {
        props.saveProfile(FormData).then(
            () => {
                setEditMode(false);
            }
        );
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
                    {editMode
                        ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                        : <ProfileData goToEditMode={() => {
                            setEditMode(true)
                        }} profile={props.profile} isOwner={props.isOwner}/>}
                    <div><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></div>
                </div>

            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (

        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div className={p.fullName}><b>{profile.fullName}</b></div>
            <div><b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}</div>
            {profile.lookingForAJob &&
            <div>
                <b>Professional skills: {profile.lookingForAJobDescription}</b>
            </div>}
            <div><b>About me:</b> {profile.aboutMe}</div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={p.contacts}><b>{contactTitle}:</b> {contactValue}</div>
}

export default AvatarDescription;