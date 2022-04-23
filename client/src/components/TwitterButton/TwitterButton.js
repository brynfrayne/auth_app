import React from 'react';
import twitterLogo from '../../assets/Twitter.svg';

export default function TwitterButton() {
    
    const responseTwitter = () => {
      window.open("https://floating-caverns-12877.herokuapp.com/auth/twitter", "_self");
      }

  return (
    
  <button onClick={responseTwitter} className='button--social-icons'>
    <img src={twitterLogo} alt="" className='social-icons'/>
  </button>
    
  )
}
