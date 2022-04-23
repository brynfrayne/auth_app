import React from 'react';
import fbLogo from '../../assets/Facebook.svg';


export default function FacebookButton() {
    
    const responseFacebook = () => {
      window.open("https://floating-caverns-12877.herokuapp.com/auth/facebook", "_self");
      }

  return (
    
  <button onClick={responseFacebook} className='button--social-icons'>
    <img src={fbLogo} alt="" className='social-icons'/>
  </button>
    
  )
}

