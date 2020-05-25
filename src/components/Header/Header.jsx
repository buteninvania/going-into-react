import React from 'react';
import h from "./header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={h.header}>
            <div className={h.avatar}>
                <img alt="logo" src='https://sun9-52.userapi.com/c851120/v851120160/19fa57/I2WRc_mpc9E.jpg'/>
                <div className={h.text}> Butenin Ivan</div>
            </div>
            <div className={h.loginBlock}>{props.isAuth ? props.login
                                                :<NavLink to={"/login"}>Login</NavLink>}</div>
        </header>
    );
}

export default Header;