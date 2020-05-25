import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {follow, setCurrentPage, setIsFetching, setTotalUsersCount, setUser, unFollow} from "../../redux/users-reducer";
import * as axios from "axios";
import Preloader from "../Preloader/Preloader";


class UsersContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
            {
                withCredentials: true,
            }).then(response => {
            this.props.setIsFetching(false);
            this.props.setUser(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
        this.props.setIsFetching(true);
    };
    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`,
            {
                withCredentials: true,
            }).then(response => {
            this.props.setIsFetching(false);
            this.props.setUser(response.data.items);
        });
        this.props.setIsFetching(true);
    };
    render() {
        return <>
            {this.props.isFetching === true ? <Preloader /> : false}
            <Users totalUsersCounts={this.props.totalUsersCounts}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      unFollow={this.props.unFollow}
                      follow={this.props.follow}/>
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
    }
}


export default connect(mapStateToProps, {follow,unFollow,setUser,setCurrentPage,setTotalUsersCount,setIsFetching})(UsersContainer)


