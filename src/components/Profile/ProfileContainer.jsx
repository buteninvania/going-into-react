import React from 'react';
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reduser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {witchAuthRedirect} from "../../hoc/authRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.match.params.userID; //принемает параметр userID из url из withRouter
        if (!userID) {
            userID = this.props.authorizedUserId;
            if (!userID){
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userID != prevProps.match.params.userID)
        this.refreshProfile();
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userID}
                     savePhoto={this.props.savePhoto}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    witchAuthRedirect
)(ProfileContainer);

