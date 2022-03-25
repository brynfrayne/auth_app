import React from 'react';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import arrow from '../../assets/arrow.svg';
import './Header.scss';

export default function Header({isDarkMode}) {
  return (
    <div className='header'>
        {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
        <div className='dropdown'>
            <img src={arrow} alt="" className='dropdown__arrow'/>
            <div className='dropdown__content'>
                <p>My Profile</p>
                <p>Group Chat</p>
                <p>Logout</p>
            </div>
        </div>
    </div>
  )
}
