import React from "react";
import {addMessageAC, DialogType, MessageType} from "../../redux/message-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {witchAuthRedirect} from "../../hoc/authRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    newMessageText: string
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        messages: state.messagePage.messageData,
        dialogs: state.messagePage.dialogData,
        newMessageText: state.messagePage.newMessageText,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchTProps = (dispatch) => {
    return {
        addMessage: (newMessageText) => {
            dispatch(addMessageAC(newMessageText));
        },
    }
}

export default compose(connect(mapStateToProps,mapDispatchTProps), witchAuthRedirect)(Dialogs);