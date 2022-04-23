import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import arrow from '../../assets/arrow.svg';
import profile from '../../assets/profile_icon.svg';
import group from '../../assets/group_icon.svg';
import logout from '../../assets/logout_icon.svg';
import './Header.scss';
import axios from 'axios';

export default function Header({isDarkMode}) {
    const navigate = useNavigate();
    const handleClick = () => {
        axios.get('https://floating-caverns-12877.herokuapp.com/logout')
        .then(response=>{
            navigate('/login');
        })
    }
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
                    <button onClick={handleClick} className='dropdown__button'>
                        <img src={logout} alt="" />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
