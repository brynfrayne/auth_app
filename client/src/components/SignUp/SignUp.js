import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import emailIcon from '../../assets/email.svg';
import passwordIcon from '../../assets/lock.svg';
import './SignUp.scss';
import axios from  'axios';
import uniqid from 'uniqid';
import GoogleButton from '../GoogleButton/GoogleButton';
import FacebookButton from '../FacebookButton/FacebookButton';
import TwitterButton from '../TwitterButton/TwitterButton';
import GithubButton from '../GithubButton/GithubButton';


export default function SignUp({isDarkMode}) {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState();
    const [id, setId] = useState(uniqid());
    const navigate = useNavigate();

    const handleSubmit = (event) => {
       
        event.preventDefault();
        setIsSubmit(true);
        setEmail(event.target.elements.email.value);
        
        
        axios.post("https://floating-caverns-12877.herokuapp.com/signup", {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            name: "Greetings, what is thy name?",
            bio: "Please enter some fun words about yourself here!",
            phone: '123-456-7890',
            id: id,
            avatar_url: 'https://avatars.githubusercontent.com/u/91647976?v=4'
        })
        .then((response) => {
            sessionStorage.setItem('token', response.data.token);
            console.log(response)
        })
        .catch((error)=>{
            console.error(error)
        })
    };

    useEffect(()=>{
        if (isSubmit) {
            navigate(`/profile/${id}`);
        }
    });

    return (
        // <>
        // {loggedIn ? <Profile/>:
    <div className='login'>
        <div className='logo__wrapper'>
            {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
        </div>
        <h1 className='login__title'>Join thousands of learners from around the world</h1>
        <p className='login__subtitle'>
            Master web development by making real-life projects. 
            There are multiple paths for you to choose
        </p>
        <form className='login__form' onSubmit={handleSubmit}>
            <img src={emailIcon} alt=""  className='login__form-input-icon'/>
            <input id='email' name='email' type="email" className='login__form-input' placeholder='Email'/>
            <img src={passwordIcon} alt=""  className='login__form-input-icon'/>
            <input id='password' name='password' type="password" className='login__form-input' placeholder='Password'/>
            <button className='button'>Start coding now</button>
            <p className='login__form-subtext'>or continue with these social profile</p>
            
        </form>
        <div className='social-icons__wrapper'>
              <GoogleButton/>
              <FacebookButton/>
              <TwitterButton/>
              <GithubButton/>
          </div>
        <p className='login__form-subtext'>Already a member? <NavLink to='/login'>Login</NavLink></p>
    </div>
// }
    // </>
  )
}
