import React from 'react';
import headshot from '../../assets/headshot.jpg';
import './EditProfile.scss';


export default function EditProfile() {
  return (
    <div>
      <div>
        <h1>Change Info</h1>
        <p>Changes will be reflected to every services</p>
        <form action="" className='form'>
          <div className='edit-profile__headshot-wrapper'>
            <img src={headshot} alt="" className='edit-profile__headshot'/>
            <p className='edit-profile__subtext'>CHANGE PHOTO</p>
          </div>
          <label htmlFor="name" className='form__label'>Name</label>
          <input type="text" placeholder='Enter your name..' className='form__input'/>
          <label htmlFor="Bio" className='form__label'>Bio</label>
          <textarea rows="4" type="text" placeholder='Enter your bio..' className='form__input form__label--textarea'/>
          <label htmlFor="Phone" className='form__label'>Phone</label>
          <input type="phone" placeholder='Enter your phone..' className='form__input'/>
          <label htmlFor="email" className='form__label'>Email</label>
          <input type="email" placeholder='Enter your email..' className='form__input'/>
          <label htmlFor="password" className='form__label'>Password</label>
          <input type="password" placeholder='Enter your new password..' className='form__input'/>
          <button className='button button--save'>Save</button>
        </form>
        
      </div>
    </div>
  )
}
