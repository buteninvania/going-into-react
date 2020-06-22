import React from "react";
import Paginator from "../commons/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../Types/types";

type PropsType = {
    onPageChanged: (pageNumber: number) => void,
    currentPage: number,
    totalUsersCounts: number,
    pageSize: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    follow: (userId:number) => void,
    unFollow: (userId:number) => void
}


const Users: React.FC<PropsType> = ({onPageChanged, currentPage, totalUsersCounts, pageSize, users, ...props}) => {

    return <div>

        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCounts={totalUsersCounts} pageSize={pageSize} />
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={props.followingInProgress}
                              follow={props.follow}
                              unFollow={props.unFollow}/>

        )}
    </div>
}

export default Users;