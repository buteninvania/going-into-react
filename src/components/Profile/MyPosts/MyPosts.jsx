import React from 'react';
import m from "./MyPosts.module.css"
import Post from "./Post/Post"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../Utils/Validation/validators";
import {TextArea} from "../../commons/FormsControls/FormsControls";


const MyPosts = (props) => {
    let state = props.profilePage;
    let postElements = state.postData.map(m => <Post message={m.message} key={m.id} like={m.like}/>)


    let addPost = (values) => props.addPost(values.newPostText);

    return (
        <div className={m.wall}>
            <div className={m.addPost}>
                <h3>My Posts</h3>
                <AddPostFormRedux onSubmit={addPost}/>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    );
}

let maxLength15 = maxLengthCreator(15);
const addPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[requiredField, maxLength15]} component={TextArea} name="newPostText" placeholder={"Enter text..."}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({
    form: 'addPost',
})(addPostForm);

export default MyPosts;