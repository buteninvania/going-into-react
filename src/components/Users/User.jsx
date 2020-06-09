import {NavLink} from "react-router-dom";
import React from "react";
import s from "./users.module.css";
import urlPhoto from "../commons/img/computer-icons-user-profile-clip-art-png-favpng-5c0bJPDhifwVUMpsCcT9yXUJw.jpg";



const User = ({user, followingInProgress, unFollow, follow }) => {

    return (
            <div className={s.usersContainer}>
                    <span>
                        <NavLink to={"/profile/" + user.id}><img src={user.photos.small != null ? user.photos.small : urlPhoto}/></NavLink>
                        <div> {user.followed
                            ? <button disabled={followingInProgress.some(id=>id===user.id)}
                                      onClick={() => {unFollow(user.id);}}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id=>id===user.id)}
                                      onClick={() => {follow(user.id);}}>Follow</button>}
                        </div>
                    </span>
                <span className={s.userDescription}>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"city"}</div>
                            <div>{"country"}</div>
                        </span>
                    </span>
            </div>

    )
}

export default User;