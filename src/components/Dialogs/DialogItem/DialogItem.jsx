import React from "react";
import d from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div><NavLink to={"/dialogs/" + props.id} className={d.dialog + " " + d.active}>{props.name}</NavLink></div>
    )
}

export default DialogItem