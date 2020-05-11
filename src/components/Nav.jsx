import React from 'react';
import n from"./nav.module.css";

const Nav = () => {
    return (
        <nav className = {n.nav}>
            <div><a href="#s">Profile</a></div>
            <div><a href="#s">Message</a></div>
            <div><a href="#s">News</a></div>
            <div><a href="#s">Music</a></div>
            <div><a href="#s">Settings</a></div>
      </nav> 
    );
}

export default Nav;