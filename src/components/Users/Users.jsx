import {NavLink} from "react-router-dom";
import React from "react";
import s from "./users.module.css";
import urlPhoto from "../../img/computer-icons-user-profile-clip-art-png-favpng-5c0bJPDhifwVUMpsCcT9yXUJw.jpg";
import * as axios from "axios";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCounts / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>

        <div className={s.currentsPageList}>
            {pages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : s.currentsPage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>

        {props.users.map(u =>
            <div className={s.usersContainer} key={u.id}>
                    <span>
                        <NavLink to={"/profile/" + u.id}><img src={u.photos.small != null ? u.photos.small : urlPhoto}/></NavLink>
                        <div> {u.follow
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "4deb8f14-6cf3-406a-968c-ffbe6aebefc3"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unFollow(u.id);
                                        }
                                    });
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "4deb8f14-6cf3-406a-968c-ffbe6aebefc3"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id);
                                        }
                                    });
                            }}>Follow</button>}
                        </div>
                    </span>
                <span className={s.userDescription}>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                    </span>
            </div>
        )}
    </div>
}

export default Users;