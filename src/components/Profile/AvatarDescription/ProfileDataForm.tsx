import React from "react"
import {reduxForm, InjectedFormProps} from "redux-form"
import p from "./avatarDescription.module.css"
import f from "./../../commons/FormsControls/FormsControls.module.css"
import {createField, GetStringKeysType, Input, TextArea} from "../../commons/FormsControls/FormsControls"
import {ProfileType} from "../../../Types/types"

const ProfileDataFormRedux: React.FC<InjectedFormProps<ProfileType, PropsProfileDataFormReduxType> & PropsProfileDataFormReduxType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit = {handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className = {f.formSummaryError}>{error}</div>}
            <div className = {p.fullName}>
                Full name: {createField<ProfileDataFormReduxKeysType>("fullName", [], Input, "Full name")}
            </div>
            <div>
                <b>Looking for a job: </b> {createField<ProfileDataFormReduxKeysType>("lookingForAJob", [], Input, "", "checkbox")}
            </div>
            <div>
                <b>Professional skills: {createField<ProfileDataFormReduxKeysType>("lookingForAJobDescription", [], TextArea, "My skills")}</b>
            </div>
            <div>
                <b>About me:</b> {createField<ProfileDataFormReduxKeysType>("aboutMe", [], TextArea, "About me")}
            </div>
            <div>
                <b>Contacts: </b>
                    {Object
                        .keys(profile.contacts)
                        .map(key => {
                            return <div className={p.contacts} key={key}>
                                        <b>{key}: {createField("contacts." + key, [], Input, key)} </b>
                                    </div>})}
            </div>
        </form>
    )
}

const ProfileDataForm = reduxForm<ProfileType, PropsProfileDataFormReduxType>({form: "editProfile"})(ProfileDataFormRedux)

export default ProfileDataForm

type PropsProfileDataFormReduxType = {
    profile: ProfileType
}
type ProfileDataFormReduxKeysType = GetStringKeysType<ProfileType>