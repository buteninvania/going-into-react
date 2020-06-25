import React from "react";
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../commons/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../Utils/Validation/validators";
import {DialogType, MessageType} from "../../redux/message-reducer";

type PropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    addMessage: (newMessageText: string) => void,
    isAuth: boolean
}
type DialogsFormValuesType = {
    newMessageText: any
}
type DialogsFormValuesKeysType = keyof DialogsFormValuesType

const Dialogs: React.FC<PropsType> = ({dialogs, messages, addMessage, isAuth}) => {
    let dialogElements = dialogs.map(d => (<DialogItem name={d.name} key={d.id} id={d.id} urlImg={d.urlImg}/>));
    let messageElements = messages.map(m => (<MessageItem message={m.message} key={m.id}/>));


    let addNewMessage = (newMessageText:any) => {
        addMessage(newMessageText);
    };

    if (isAuth === false) return <Redirect to={"/login"}/>
    // @ts-ignore
    return (
        <div className={d.dialogues}>
            <div className={d.dialoguesItem}>
                {dialogElements}
            </div>
            <div className={d.messages}>
                {messageElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

let maxLength50 = maxLengthCreator(50);

const AddMessageForm: any = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit} className={d.addMessage}>
            <div>
                <Field component={TextArea} validate={[requiredField, maxLength50]} name="newMessageText" placeholder="Enter new Message"/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogsFormValuesType>({
    form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs