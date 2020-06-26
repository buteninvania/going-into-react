import React, {ChangeEvent, useState} from "react"
import p from "./avatarDescription.module.css"
import Preloader from "../../commons/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import urlPhoto from "./../../commons/img/computer-icons-user-profile-clip-art-png-favpng-5c0bJPDhifwVUMpsCcT9yXUJw.jpg"
import ProfileDataForm from "./ProfileDataForm"
import {ContactsType, ProfileType} from "../../../Types/types"

const AvatarDescription: React.FC<PropsAvatarDescriptionType> = ({savePhoto, isOwner, profile, status, updateStatus, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (FormData: ProfileType) => {saveProfile(FormData).then(() => {setEditMode(false)})}

    return (
        <div>
            <div className = {p.wallImage}>
                <img alt="CuberPunk" src="https://s1.1zoom.ru/big3/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg" />
            </div>
            <div className = {p.avatar}>
                <div>
                    <img alt = "avatar" src = {profile.photos.large || urlPhoto} />
                    {isOwner && <input className = {p.addPhoto} type = {"file"} onChange = {onMainPhotoSelected} />}
                </div>
                <div className = {p.discription}>
                    {editMode
                        ? <ProfileDataForm initialValues = {profile} onSubmit = {onSubmit} profile = {profile} />
                        : <ProfileData goToEditMode={() => {setEditMode(true)}} profile = {profile} isOwner = {isOwner} />}
                    <div><ProfileStatusWithHooks status = {status} updateStatus = {updateStatus} /></div>
                </div>
            </div>
        </div>
    )
}
const ProfileData: React.FC<PropsProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner &&
            <div>
                <button onClick = {goToEditMode}>Edit</button>
            </div>}
            <div className = {p.fullName}><b>{profile.fullName}</b></div>
            <div><b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}</div>
            {profile.lookingForAJob &&
            <div>
                <b>Professional skills: {profile.lookingForAJobDescription}</b>
            </div>}
            <div><b>About me:</b> {profile.aboutMe}</div>
            <div>
                <b>Contacts: </b> {Object
                                .keys(profile.contacts)
                                .map((key) => {return <Contact key = {key} contactTitle = {key} contactValue = {profile.contacts[key as keyof ContactsType]}/>})}
            </div>
        </div>
    )
}
const Contact: React.FC<PropsContactType> = ({contactTitle, contactValue}) => {
    return <div className={p.contacts}><b>{contactTitle}:</b> {contactValue}</div>
}

export default AvatarDescription

type PropsAvatarDescriptionType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}
type PropsProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
type PropsContactType = {
    contactTitle: string
    contactValue: string
}