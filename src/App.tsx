import React, {ComponentType} from "react"
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import store, {AppStateType} from "./redux/redux-store"
import {initializeApp} from "./redux/app-reduser"
import {witchSuspense} from "./hoc/witchSuspense"
import "./App.scss"
import Preloader from "./components/commons/Preloader/Preloader"
import Nav from "./components/Nav/Nav"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import Settings from "./components/Settings/Settings"
import {Login} from "./components/Login/Login"
import {UsersPage} from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const SuspendedDialogs = witchSuspense(DialogsContainer)
const SuspendedProfile = witchSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className = "app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className = "app-wrapper-content">
                    <Switch>
                        <Route exact path = "/" render = {() => <Redirect to = {"/profile"} />} />
                        <Route path = "/profile/:userID?" render = {() => <SuspendedProfile />} />
                        <Route path = "/dialogs" render = {() => <SuspendedDialogs /> } />
                        <Route path = "/news" render = {() => <News />} />
                        <Route path = "/music" render = {() => <Music />} />
                        <Route path = "/settings" render = {() => <Settings />} />
                        <Route path = "/users" render = {() => <UsersPage title = {"Users"} />} />
                        <Route path = "/login" render = {() => <Login />} />
                        <Route path = "*" render = {() => <div> NOT FOUND </div>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App)

const ButInProjectApp: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
}
export default ButInProjectApp

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}