import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import m from "./MyPosts.module.css"
import Post from "./Post/Post"
import {maxLengthCreator, requiredField} from "../../../Utils/Validation/validators"
import {createField, TextArea, GetStringKeysType} from "../../commons/FormsControls/FormsControls"
import {PostData} from "../../../Types/types"

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const postElements = props.postData.map(m => <Post message = {m.message} key = {m.id} like = {m.like} />)
    const addPost = (values: AddPostFormValuesType) => props.addPost(values.newPostText)
    return (
        <div className = {m.wall}>
            <div className = {m.addPost}>
                <h3>My Posts</h3>
                <AddPostFormRedux onSubmit = {addPost}/>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    )
}

const maxLength15 = maxLengthCreator(15)
const addPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsFormType> & PropsFormType> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesKeysType>("newPostText", [requiredField, maxLength15], TextArea, "Enter text...")}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsFormType>({form: "addPost"})(addPostForm)

const MyPostMemorized = React.memo(MyPosts)
export default MyPostMemorized

export type MapPropsType = {
    postData: Array<PostData>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
type PropsFormType = {}
type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeysType<AddPostFormValuesType>