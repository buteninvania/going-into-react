import React from "react";
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {addMessageActionCreator, updateMessageChangeActionCreator} from "../../redux/message-reduser";

const Dialogs = (props) => {

    let dialogElements = props.state.dialogData.map(d => (<DialogItem name={d.name} id={d.id} urlImg={d.urlImg}/>))
    let messageElements = props.state.messageData.map(m => (
        <MessageItem message={m.message} friends={props.state.dialogData[1]}/>))

    let addMessageElements = React.createRef();

    let addMessage = () => {
        let text = addMessageElements.current.value;
        props.dispath(addMessageActionCreator());
    }

    let onMessageChange = () => {
        let text = addMessageElements.current.value;
        {
            props.dispath(updateMessageChangeActionCreator(text))
        }
        ;

    }

    return (
        <div className={d.dialogues}>
            <div className={d.dialoguesItem}>
                {dialogElements}
            </div>
            <div className={d.messages}>
                {messageElements}
                <div className={d.addMessage}>
                    <div><textarea ref={addMessageElements} value={props.state.newMessageText}
                                   onChange={onMessageChange}></textarea></div>
                    <div>
                        <button onClick={addMessage}>Add Message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs