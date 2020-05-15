import React from 'react';
import n from "./nav.module.css";
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Nav = (props) => {

    return (
        <nav className={n.nav}>
            <div><NavLink to="/profile" activeClassName={n.active}>Profile</NavLink></div>
            <div><NavLink to="/dialogs" activeClassName={n.active}>Message</NavLink></div>
            <div><NavLink to="/news" activeClassName={n.active}>News</NavLink></div>
            <div><NavLink to="/music" activeClassName={n.active}>Music</NavLink></div>
            <div><NavLink to="/settings" activeClassName={n.active}>Settings</NavLink></div>
            <Friends friendsUrl={props.friendsUrl}/>
        </nav>
    );
}

export default Nav;