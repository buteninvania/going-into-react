import React from 'react';
import n from"./nav.module.css";

const Nav = () => {
    return (
        <nav className = {n.nav}>
            <div><a href="/profile">Profile</a></div>
            <div><a href="/dialogs">Message</a></div>
            <div><a href="/news">News</a></div>
            <div><a href="/music">Music</a></div>
            <div><a href="/settings">Settings</a></div>
      </nav> 
    );
}

export default Nav;