import React from 'react';
import googleLogo from '../../assets/Google.svg';

export default function GoogleButton() {
    
    const responseGoogle = () => {
      window.open("http://localhost:8000/auth/google", "_self");
      }

  return (
    
  <button onClick={responseGoogle} className='button--social-icons'>
    <img src={googleLogo} alt="" className='social-icons'/>
  </button>
    
  )
}
