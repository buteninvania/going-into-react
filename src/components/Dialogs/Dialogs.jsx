import React from "react";
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../commons/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../Utils/Validation/validators";

const Dialogs = (props) => {
    let dialogElements = props.dialogs.map(d => (<DialogItem name={d.name} key={d.id} id={d.id} urlImg={d.urlImg}/>));
    let messageElements = props.messages.map(m => (<MessageItem message={m.message} key={m.id}/>));


    let addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    };

    if (props.isAuth === false) return <Redirect to={"/login"}/>
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
const AddMessageForm = (props) => {
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

const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs