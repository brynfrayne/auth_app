import React, {useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import twitterLogo from '../../assets/Twitter.svg';
import githubLogo from '../../assets/Github.svg';
import emailIcon from '../../assets/email.svg';
import passwordIcon from '../../assets/lock.svg';
import './Login.scss';
import axios from 'axios';
import GoogleButton from '../GoogleButton/GoogleButton';
import FacebookButton from '../FacebookButton/FacebookButton';
import TwitterButton from '../TwitterButton/TwitterButton';
import GithubButton from '../GithubButton/GithubButton';



export default function Login({isDarkMode}) {
  const [id, setId] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/login', {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value
    })
    .then((response)=>{
      console.log(response.data)
      setId(response.data.foundUser.id);
      sessionStorage.setItem('token', response.data.token);
    })
    .catch((error)=>{
      console.error(error)
  })
  }

  useEffect(()=>{
    if(id){
      navigate(`/profile/${id}`);
    }
  })

  return (   
      
  <div className='login'>
      <div className='logo__wrapper'>
      {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
      </div>
      <h1 className='login__title'>Login</h1>
      <form className='login__form' onSubmit={handleSubmit}>
          <img src={emailIcon} alt=""  className='login__form-input-icon'/>
          <input id="email" type="email" className='login__form-input' placeholder='Email'/>
          <img src={passwordIcon} alt=""  className='login__form-input-icon'/>
          <input id="password" type="password" className='login__form-input' placeholder='Password'/>
          <button className='button'>Login</button>
          <p className='login__form-subtext'>or continue with these social profile</p>
          
      </form>
      <div className='social-icons__wrapper'>
              <GoogleButton/>
              <FacebookButton/>
              <TwitterButton/>
              <GithubButton/>
          </div>
      
      <p className='login__form-subtext'>Don't have an account yet? <NavLink to='/'>Register</NavLink></p>
  </div>
  
)
  
}
