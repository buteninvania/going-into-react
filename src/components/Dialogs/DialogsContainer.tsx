import React, {ComponentType} from "react"
import {connect} from "react-redux"
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"
import {actions, DialogType, MessageType} from "../../redux/message-reducer"
import {witchAuthRedirect} from "../../hoc/authRedirect"
import Dialogs from "./Dialogs"

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messages: state.messagePage.messageData,
        dialogs: state.messagePage.dialogData,
    }
}

export default compose<ComponentType>(connect(mapStateToProps, {addMessage :actions.addMessage}), witchAuthRedirect)(Dialogs)

type MapStateToPropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}