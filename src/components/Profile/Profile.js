import React from 'react'
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import headshot from '../../assets/headshot.jpg';
import './Profile.scss';

export default function Profile({isDarkMode}) {
  return (
    <div>
      <div className='profile__header'>
      {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
        <img src={headshot} alt="" className='profile__thumbnail'/>
      </div>
      <h1>Personal info</h1>
      <p>Basic info, like your name and photo</p>
      <section>
        <div className='profile__subtitle-wrapper'>
          <div className='profile__info-heading'>
            <h2>Profile</h2>
            <p className='profile__subtext'>Some info may be visible to other people</p>
          </div>
          <div>
            <button className='button--edit'>Edit</button>
          </div>
        </div>
        <div className='profile__info'>
          <p>PHOTO</p>
          <img src={headshot} alt="" className='profile__headshot'/>
        </div>
        <div className='profile__info'>
          <p>NAME</p>
          <p>Xanthe Neal</p>
        </div>
        <div className='profile__info'>
          <p>BIO</p>
          <p>I am a software developer...</p>
        </div>
        <div className='profile__info'>
          <p>EMAIL</p>
          <p>xanthe.neal@gmail.com</p>
        </div>
        <div className='profile__info'>
          <p>PASSWORD</p>
          <p>***********</p>
        </div>

      </section>
    </div>
  )
}
