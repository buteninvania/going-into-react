import React from "react";
import {addMessageActionCreator, updateMessageChangeActionCreator} from "../../redux/message-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        messages: state.messagePage.messageData,
        dialogs: state.messagePage.dialogData,
        newMessageText: state.messagePage.newMessageText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
        onMessageChange: (text) => {
            dispatch(updateMessageChangeActionCreator(text))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;