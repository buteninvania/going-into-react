import React from "react";
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {

    let dialogElements = props.state.dialogData.map( d =>  (<DialogItem name={d.name} id={d.id} urlImg={d.urlImg}/>))
    let messageElements = props.state.messageData.map (m => (<MessageItem message={m.message} />))

    return (
        <div className={d.dialogues}>
            <div className={d.dialoguesItem}>
                { dialogElements }
            </div>
            <div className={d.messages}>
                { messageElements }
            </div>
        </div>
    )
}

export default Dialogs