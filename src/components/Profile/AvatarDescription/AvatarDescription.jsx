import React from 'react';
import p from "./avatarDescription.module.css";


const AvatarDescription = () => {
    return (
        <div>
            <div className={p.wallImage}>
                <img alt="CuberPunk"
                     src='https://s1.1zoom.ru/big3/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg'/>
            </div>
            <div className={p.avatar}>
                <img alt="avatar" src='https://www.codewinds.com/assets/article/reactjs-conf-logo-dsc_5109-800.jpg'/>
                <p>Here I will practice react JS by adding different elements from the server to the wall</p>
            </div>
        </div>
    )
}

export default AvatarDescription;