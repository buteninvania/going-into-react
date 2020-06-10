import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {HashRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reduser";
import Preloader from "./components/commons/Preloader/Preloader";
import store from "./redux/redux-store";
import {witchSuspense} from "./hoc/witchSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userID?' render={witchSuspense(ProfileContainer)}/>
                    <Route path='/dialogs' render={witchSuspense(DialogsContainer)}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const ButInProjectApp = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>

}
export default ButInProjectApp