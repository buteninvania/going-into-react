import React, {ChangeEvent, useEffect, useState} from "react"
import p from "./avatarDescription.module.css"

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode]  = useState(false)
    const [status, setStatus]  = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick = {activateEditMode} className = {p.statusUser}>
                    <b>Status:</b> {props.status || "no status..."}
                </span>
            </div>}
            {editMode &&
            <div>
                <input onChange = {onStatusChange} value = {status} autoFocus = {true} onBlur = {deActivateEditMode} />
            </div>}
        </div>
    )
}

export default ProfileStatusWithHooks

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}