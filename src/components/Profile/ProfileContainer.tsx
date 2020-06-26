import React from "react"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {connect} from "react-redux"
import {compose} from "redux"
import {witchAuthRedirect} from "../../hoc/authRedirect"
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer"
import Profile from "./Profile"
import {AppStateType} from "../../redux/redux-store"
import {ProfileType} from "../../Types/types"

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.refreshProfile()
    }
    refreshProfile() {
        let userID: number | null = +this.props.match.params.userID
        if (!userID) {
            userID = this.props.authorizedUserId
            if (!userID) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userID as number)
        this.props.getStatus(userID as number)
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userID != prevProps.match.params.userID)
        this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userID}
                     savePhoto={this.props.savePhoto} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    witchAuthRedirect
)(ProfileContainer)

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userID: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
