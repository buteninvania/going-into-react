import React from "react"
import AvatarDescription from "./AvatarDescription/AvatarDescription"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ProfileType} from "../../Types/types";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <AvatarDescription
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}