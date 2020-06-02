import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow,
    followSuccess, getUsers,
    setCurrentPage, unFollow,
    unFollowSuccess,
} from "../../redux/users-reducer";
import Preloader from "../commons/Preloader/Preloader";
import {witchAuthRedirect} from "../../hoc/authRedirect";
import {compose} from "redux";



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (currentPage) => {
        this.props.getUsers(currentPage, this.props.pageSize);
    };

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : false}
            <Users totalUsersCounts={this.props.totalUsersCounts}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unFollow={this.props.unFollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCounts: state.usersPage.totalUsersCounts,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



export default compose (
    witchAuthRedirect,
    connect(mapStateToProps, {followSuccess, unFollowSuccess, setCurrentPage, getUsers, follow, unFollow,})
)
(UsersContainer);

