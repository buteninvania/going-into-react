import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    FilterType,
    follow,
    getUsers,
    unFollow,
} from "../../redux/users-reducer";
import Preloader from "../commons/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCounts, getUsersState, getUsersFilter
} from "../../redux/users-selectors";
import {UsersType} from "../../Types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCounts: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type OwnPropsType = {
    title: string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    };

    onPageChanged = (currentPage: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter);
    };

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter);
    }

    render() {
        return <>
            <div>{this.props.title}</div>
            {this.props.isFetching === true ? <Preloader/> : false}
            <Users totalUsersCounts={this.props.totalUsersCounts}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   onFilterChanged={this.onFilterChanged}
                   users={this.props.users}
                   unFollow={this.props.unFollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCounts: getTotalUsersCounts(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {getUsers, follow, unFollow,}))
(UsersContainer);

