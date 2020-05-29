import React from "react";
import {addMessage, onMessageChange,} from "../../redux/message-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {witchAuthRedirect} from "../../hoc/authRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        messages: state.messagePage.messageData,
        dialogs: state.messagePage.dialogData,
        newMessageText: state.messagePage.newMessageText,
        isAuth: state.auth.isAuth,
    }
}

export default compose(connect
                        (mapStateToProps,{addMessage, onMessageChange}),
                         witchAuthRedirect)(Dialogs);