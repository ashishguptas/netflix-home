import React, { useEffect, useState } from 'react'
import './Nav.css';
import logo from './img/logo.svg';
import profilePic from './img/user.jpg';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {

        window.addEventListener('scroll', () => {
            if(window.scrollY > 100){
                handleShow(true);
            } else {
                handleShow(false);
            }
        })
        return () => {
            window.removeEventListener('scroll');
        }
    }, [])

    return (
        <div className={`nav ${show && 'nav_sticky'}`}>
            <img className="nav_logo" src={logo} alt="logo" />
            <img className="nav_avatar" src={profilePic} alt="Profile Icon" />
        </div>
    )
}

export default Nav
