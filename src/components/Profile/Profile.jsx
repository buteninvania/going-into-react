import React from 'react';
import p from "./profile.module.css";
import MyPosts from './MyPosts/MyPosts';

const Content = () => {
    return (
        <div>
            <div className={p.wallImage}><img alt="CuberPunk"
                                              src='https://kartinkinaden.ru/uploads/posts/2019-08/1565900257_art-kiberpank-122.jpg'/>
            </div>
            <div className={p.avatar}>
                <img alt="avatar" src='https://avavatar.ru/images/full/34/yn32JIbbMXNI6Fpd.jpg'/>
                <p>I try css modules and practice on this page ...</p>
            </div>
            <MyPosts/>
        </div>
    );
}

export default Content;