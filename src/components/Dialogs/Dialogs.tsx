import React from "react"
import d from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import MessageItem from "./MessageItem/MessageItem"
import {reduxForm, InjectedFormProps} from "redux-form"
import {createField, TextArea} from "../commons/FormsControls/FormsControls"
import {maxLengthCreator, requiredField} from "../../Utils/Validation/validators"
import {DialogType, MessageType} from "../../redux/message-reducer"

const Dialogs: React.FC<PropsType> = ({dialogs, messages, addMessage}) => {
    const dialogElements = dialogs.map(d => (<DialogItem name = {d.name} key = {d.id} id = {d.id} urlImg = {d.urlImg}/>))
    const messageElements = messages.map(m => (<MessageItem message = {m.message} key = {m.id}/>))

    const addNewMessage = (values: NewMessageFormValuesType) => {addMessage(values.newMessageText)}

    return (
        <div className = {d.dialogues}>
            <div className = {d.dialoguesItem}>
                {dialogElements}
            </div>
            <div className = {d.messages}>
                {messageElements}
                <AddMessageFormRedux onSubmit = {addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsFormType> & PropsFormType> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit} className = {d.addMessage}>
            <div>
                {createField<NewMessageFormValuesKeysType>("newMessageText", [requiredField, maxLength50], TextArea, "Enter new Message")}
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsFormType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs

type PropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    addMessage: (newMessageText: string) => void,
}
type NewMessageFormValuesType = { newMessageText: string }
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsFormType = {}
