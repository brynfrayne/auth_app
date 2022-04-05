import React from 'react';
import GithubLogo from '../../assets/Github.svg';

export default function GithubButton() {
    
    const responseGithub = () => {
      window.open("http://localhost:8000/auth/Github", "_self");
      }

  return (
    
  <button onClick={responseGithub} className='button--social-icons'>
    <img src={GithubLogo} alt="" className='social-icons'/>
  </button>
    
  )
}
