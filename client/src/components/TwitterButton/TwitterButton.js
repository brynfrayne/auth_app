import React from 'react';
import twitterLogo from '../../assets/Twitter.svg';

export default function TwitterButton() {
    
    const responseTwitter = () => {
      window.open("http://localhost:8000/auth/twitter", "_self");
      }

  return (
    
  <button onClick={responseTwitter} className='button--social-icons'>
    <img src={twitterLogo} alt="" className='social-icons'/>
  </button>
    
  )
}
