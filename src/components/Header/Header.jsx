import React from 'react';
import h from "./header.module.css";

const Header = () => {
    return (
        <header className = {h.header}>
            <div className={h.avatar}><img alt="logo" src= 'https://sun9-52.userapi.com/c851120/v851120160/19fa57/I2WRc_mpc9E.jpg'/></div>
            <div className={h.text}> Butenin Ivan</div>
        </header>
    );
}

export default Header;