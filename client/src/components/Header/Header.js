import React from 'react';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import arrow from '../../assets/arrow.svg';
import profile from '../../assets/profile_icon.svg';
import group from '../../assets/group_icon.svg';
import logout from '../../assets/logout_icon.svg';
import './Header.scss';

export default function Header({isDarkMode}) {
  return (
    <div className='header'>
        {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
        <div className='dropdown'>
            <img src={arrow} alt="" className='dropdown__arrow'/>
            <div className='dropdown__content'>
                <div className='dropdown__content-wrapper'>
                    <img src={profile} alt="" />
                    <p>My Profile</p>
                </div>
                <div className='dropdown__content-wrapper'>
                    <img src={group} alt="" />
                    <p>Group Chat</p>
                </div>
                <div className='dropdown__content-divider'></div>
                <div className='dropdown__content-wrapper'>
                    <img src={logout} alt="" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
  )
}
