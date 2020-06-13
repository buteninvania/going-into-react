import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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
import {witchSuspense} from "./hoc/witchSuspense";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

    componentDidMount() { // срабатывает один раз когда компонента вмонтируется
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (  // главная роль компоненты вернуть JSX
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userID?' render={witchSuspense(ProfileContainer)}/>
                        <Route path='/dialogs' render={witchSuspense(DialogsContainer)}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='*' render={() => <div>NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
//HOC(компонента высшего порядка) - функция которая принемает одну компоненту и возвращает другую компоненту
//connect - HOC для того чтобы дать данные из store
//compose - один за одним изпользует HOC (withRouter, connect)

const ButInProjectApp = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>

}
export default ButInProjectApp