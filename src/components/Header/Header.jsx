import React from 'react';
import h from "./header.module.css";

const Header = () => {
    return (
        <header className = {h.header}>
            <img alt="logo" src= 'https://farm5.staticflickr.com/4719/38474702340_7998619224_o.jpg'/>
            <p> Butenin Ivan</p>
        </header>
    );
}

export default Header;