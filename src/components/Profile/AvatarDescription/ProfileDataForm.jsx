import React from "react";
import p from "./avatarDescription.module.css";
import f from "./../../commons/FormsControls/FormsControls.module.css"
import {createField, Input, TextArea} from "../../commons/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataFormRedux = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={f.formSummaryError}>{error}</div>}
            <div className={p.fullName}>
                Full name: {createField("fullName", [], Input, "Full name")}
            </div>
            <div>
                <b>Looking for a job: </b> {createField("lookingForAJob", [], Input, "", "checkbox")}
            </div>
            <div>
                <b>Professional skills: {createField("lookingForAJobDescription", [], TextArea, "My skills")}</b>
            </div>
            <div>
                <b>About me:</b> {createField("aboutMe", [], TextArea, "About me")}
            </div>

            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div className={p.contacts} key={key}>
                    <b>{key}: {createField("contacts." + key, [], Input, key)} </b>
                </div>
            })}
            </div>
        </form>
    )
}
let ProfileDataForm = reduxForm({form: "editProfile"})(ProfileDataFormRedux);

export default ProfileDataForm;