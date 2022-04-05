import React from 'react';
import fbLogo from '../../assets/Facebook.svg';


export default function FacebookButton() {
    
    const responseFacebook = () => {
      window.open("http://localhost:8000/auth/facebook", "_self");
      }

  return (
    
  <button onClick={responseFacebook} className='button--social-icons'>
    <img src={fbLogo} alt="" className='social-icons'/>
  </button>
    
  )
}

