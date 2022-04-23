import React from 'react';
import GithubLogo from '../../assets/Github.svg';

export default function GithubButton() {
    
    const responseGithub = () => {
      window.open("https://floating-caverns-12877.herokuapp.com/auth/Github", "_self");
      }

  return (
    
  <button onClick={responseGithub} className='button--social-icons'>
    <img src={GithubLogo} alt="" className='social-icons'/>
  </button>
    
  )
}
