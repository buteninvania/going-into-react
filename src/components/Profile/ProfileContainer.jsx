import React from 'react';
import Profile from "./Profile";
import {getUserProfile} from "../../redux/profile-reduser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {witchAuthRedirect} from "../../hoc/authRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = 2
        }
        this.props.getUserProfile(userID);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,

});

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    witchAuthRedirect
)(ProfileContainer);

