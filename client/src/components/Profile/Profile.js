import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/devchallenges.svg';
import darkLogo from '../../assets/devchallenges-light.svg';
import headshot from '../../assets/headshot.jpg';
import './Profile.scss';
import Header from '../Header/Header';


export default function Profile({isDarkMode}) {

const [profile, setProfile] = useState();
const { email } = useParams();
console.log(email)

const getUser = () => { 
  axios.get(`http://localhost:8000/${email}`)
    .then((response)=> {
      console.log(response.data)
      setProfile(response.data)
    })
  };
useEffect(() => {
  getUser()
}, []);

console.log(profile)
 if (!profile) {
   return <div className="loader"></div>
 } 
   return (
    <div>
      <Header isDarkMode={isDarkMode} />
      <div className='profile'>      
        <div className='profile__header'>
        {isDarkMode ? <img src={darkLogo} alt="" className='logo'/> : <img src={logo} alt="" className='logo'/>}
          <img src={headshot} alt="" className='profile__thumbnail'/>
        </div>
        <div className='profile__title-wrapper'>
          <h1>Personal info</h1>
          <p>Basic info, like your name and photo</p>
        </div>
        <section className='profile__card'>
          <div className='profile__subtitle-wrapper'>
            <div className='profile__info-heading'>
              <h2>Profile</h2>
              <p className='profile__subtext'>Some info may be visible to other people</p>
            </div>
            <div>
              {/* <button className='button--edit'> */}
              <NavLink to={`/profile/edit/${profile.id}`}
                state={{id:profile.id}} 
                className='button--edit'
                >
                Edit
              </NavLink>
              {/* </button> */}
            </div>
          </div>
          <div className='profile__info'>
            <p>PHOTO</p>
            <img src={headshot} alt="" className='profile__headshot'/>
          </div>
          <div className='profile__info'>
            <p>NAME</p>
            <p>{profile.name}</p>
          </div>
          <div className='profile__info'>
            <p>BIO</p>
            <p>{profile.bio}</p>
          </div>
          <div className='profile__info'>
            <p>EMAIL</p>
            <p>{profile.email}</p>
          </div>
          <div className='profile__info'>
            <p>PASSWORD</p>
            <p>*********</p>
          </div>

        </section>
      </div>
    </div>
  )
}
