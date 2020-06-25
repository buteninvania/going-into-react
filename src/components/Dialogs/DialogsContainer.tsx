import React from "react"
import {actions, DialogType, MessageType} from "../../redux/message-reducer"
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {witchAuthRedirect} from "../../hoc/authRedirect"
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"

type MapStateToPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        messages: state.messagePage.messageData,
        dialogs: state.messagePage.dialogData,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchTProps = (dispatch:any) => {
    return {
        addMessage: (newMessageText:any) => {
            dispatch(actions.addMessageAC(newMessageText));
        },
    }
}

export default compose(connect(mapStateToProps,mapDispatchTProps), witchAuthRedirect)(Dialogs);