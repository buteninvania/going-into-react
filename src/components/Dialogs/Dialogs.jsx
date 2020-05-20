import React from "react";
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    let state = props.messagePage;
    let dialogElements = state.dialogData.map(d => (<DialogItem name={d.name} id={d.id} urlImg={d.urlImg}/>));
    let messageElements = state.messageData.map(m => (<MessageItem message={m.message} friends={state.dialogData[1]}/>));
    let addMessageElements = React.createRef();
    let addMessage = () => props.addMessage();
    let onMessageChange = () => {
        let text = addMessageElements.current.value;
        props.onMessageChange(text);
    };

    return (
        <div className={d.dialogues}>
            <div className={d.dialoguesItem}>
                {dialogElements}
            </div>
            <div className={d.messages}>
                {messageElements}
                <div className={d.addMessage}>
                    <div>
                        <textarea ref={addMessageElements}
                                  value={state.newMessageText}
                                  onChange={onMessageChange}/>
                    </div>
                    <div>
                        <button onClick={addMessage}>Add Message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs