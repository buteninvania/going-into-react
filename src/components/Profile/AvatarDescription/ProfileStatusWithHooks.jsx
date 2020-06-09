import React, {useEffect, useState} from "react";
import p from "./avatarDescription.module.css";


const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode]  = useState(false);
    let [status, setStatus]  = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    }, [props.status]);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode} className={p.statusUser}>
                    {props.status || "no status..."}
                </span>
            </div>}
            {editMode &&
            <div>
                <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deActivateEditMode}/>
            </div>}
        </div>
    )
}

export default ProfileStatusWithHooks;