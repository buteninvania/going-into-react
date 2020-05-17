import profileReduser from "./profile-reduser";
import messageReduser from "./message-reduser";

let store = {
    _state: {
        profilePage: {
            postData: [{message: "Hi this is my first post", like: "24"},
                {message: "Hi this is my first post", like: "24"},],
            newPostText: 'IvanButenin'
        },
        messagePage: {
            messageData: [
                {message: "Hi"},
                {message: "How to works on a project?"},
            ],
            dialogData: [
                {name: "Vitalik", id: 1, urlImg: "https://sun9-14.userapi.com/c855128/v855128037/1c553e/WT0UFN-xILI.jpg?ava=1"},
                {name: "Daria", id: 2, urlImg: "https://sun9-61.userapi.com/c855336/v855336497/145d52/L6CtsbEdxFo.jpg"},
                {name: "Oleg", id: 3, urlImg: "https://sun9-45.userapi.com/c844616/v844616398/207962/5BjopuAyuuc.jpg"},
                {name: "Katy", id: 4, urlImg: "https://sun9-5.userapi.com/c855020/v855020899/226ab5/6vxTwkqdk78.jpg"},
                {name: "Anna", id: 5, urlImg: "https://sun9-58.userapi.com/c858216/v858216788/d19d8/eu8o4c8Wsp8.jpg?ava=1"},
            ],
            newMessageText: 'Hi',
        },
    },
    _callSubscriber() {
        console.log("wait observer");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },

    dispatch(action) {
        profileReduser(this._state.profilePage, action);
        messageReduser(this._state.messagePage, action);
        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;