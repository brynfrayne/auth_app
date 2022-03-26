import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import googleLogo from '../../assets/Google.svg';
import fbLogo from '../../assets/Facebook.svg';
import twitterLogo from '../../assets/Twitter.svg';
import githubLogo from '../../assets/Github.svg';
import emailIcon from '../../assets/email.svg';
import passwordIcon from '../../assets/lock.svg';
import Profile from '../Profile/Profile';
import './SignUp.scss';
import Footer from '../Footer/Footer';

export default function SignUp({isDarkMode}) {
  
    const [registered, setRegistered] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    
    return (
        <>
        {loggedIn ? <Profile/>:
    <div className='login'>
        <div className='logo__wrapper'>
            {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
        </div>
        <h1 className='login__title'>Join thousands of learners from around the world</h1>
        <p className='login__subtitle'>
            Master web development by making real-life projects. 
            There are multiple paths for you to choose
        </p>
        <form action="post" className='login__form'>
            <img src={emailIcon} alt=""  className='login__form-input-icon'/>
            <input type="email" className='login__form-input' placeholder='Email'/>
            <img src={passwordIcon} alt=""  className='login__form-input-icon'/>
            <input type="password" className='login__form-input' placeholder='Password'/>
            <button className='button'>Start coding now</button>
            <p className='login__form-subtext'>or continue with these social profile</p>
            <div className='social-icons__wrapper'>
                <img src={googleLogo} alt="" className='social-icons'/>
                <img src={fbLogo} alt="" className='social-icons'/>
                <img src={twitterLogo} alt="" className='social-icons'/>
                <img src={githubLogo} alt="" className='social-icons'/>
            </div>
        </form>
        <p className='login__form-subtext'>Already a member? <NavLink to='/login'>Login</NavLink></p>
    </div>
}
    </>
  )
}
