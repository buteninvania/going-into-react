const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_CHANGE = "UPDATE-MESSAGE-CHANGE";

const messageReduser = (state, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {message: state.newMessageText};
            state.messageData.push(newMessage);
            state.newMessageText = "";
            return state;
        case UPDATE_MESSAGE_CHANGE:
            state.newMessageText = action.text;
            return state;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const updateMessageChangeActionCreator = (text) => ({type:UPDATE_MESSAGE_CHANGE, text:text})

export default messageReduser;