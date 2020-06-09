import React from "react";
import Paginator from "../commons/Paginator/Paginator";
import User from "./User";


const Users = ({onPageChanged, currentPage, totalUsersCounts, pageSize, users, ...props}) => {

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