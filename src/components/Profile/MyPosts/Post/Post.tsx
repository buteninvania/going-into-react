import React from "react"
import posts from "./Post.module.css"

const Post: React.FC<PropsType> = ({message, like}) => {
    return (
        <div className = {posts.item}>
            <img src = "https://sun9-52.userapi.com/c851120/v851120160/19fa57/I2WRc_mpc9E.jpg" alt = "" />
            <div className = {posts.text}>
                { message }
            </div>
            <div className = {posts.like}>Like {like} </div>
        </div>
    )
}

export default Post

type PropsType = {
    message: string
    like: number
}