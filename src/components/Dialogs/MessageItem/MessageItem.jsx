import React from "react";
import d from './../Dialogs.module.css'

const MessageItem = (props) => {
    return (
        <div className={d.messageItem}>{props.message}</div>
    )
}

export default MessageItem