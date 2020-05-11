import React from 'react';
import p from "./profile.module.css";

const Content = () => {
    return (
        <div className = {p.content}>
            <div><img alt="CuberPunk" src='https://kartinkinaden.ru/uploads/posts/2019-08/1565900257_art-kiberpank-122.jpg' /></div>
            <div className = {p.avatar}>
                <img alt="avatar" src='https://avavatar.ru/images/full/34/yn32JIbbMXNI6Fpd.jpg' />
                <p>I try css modules and practice on this page ...</p>   
            </div>
        <div className = {p.post}>
            <div>my post</div>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, at! Molestias sapiente qui, ab quod cum ad animi reiciendis incidunt obcaecati fugit! Consectetur dignissimos, explicabo omnis in fugiat asperiores provident!</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam magni quod alias, eveniet iste culpa fuga natus deleniti qui dolorum voluptatibus maxime assumenda voluptates est, architecto iure earum nihil impedit?</div>
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam hic aut asperiores maiores doloribus error, consectetur aspernatur tempore beatae cupiditate eius sequi a officia explicabo magnam cum ex doloremque sed.</div>
        </div>
      </div>
    );
}

export default Content;