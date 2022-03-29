import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import headshot from '../../assets/headshot.jpg';
import camera from '../../assets/photo.svg';
import './EditProfile.scss';
import axios from 'axios';


export default function EditProfile({isDarkMode}) {
  
  const [selectedFile, setSelectedFile] = useState();
  const hiddenFileInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();

    axios.put("http://localhost:8000/editprofile", {
      image: event.target.elements.photo.value,
      name: event.target.elements.name.value,
      bio: event.target.elements.bio.value,
      phone: event.target.elements.phone.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      id: location.state.id
    })
    .then((response) => {
      console.log(response.data)
    })
    

  }
  const location = useLocation()
  
  console.log(location.state.id)

  const handleChange = event => {
    setSelectedFile(event.target.files[0])
};

  return (
    <div>
      <Header isDarkMode={isDarkMode} />
      <div className='edit-profile'>
        <div className='edit-profile__card'>
          <h1 className='edit-profile__title'>Change Info</h1>
          <p>Changes will be reflected to every services</p>
          <form action="" className='form' onSubmit={handleSubmit}>
            <div className='edit-profile__headshot-wrapper'>
              <button className='button--change-photo'>
                <img src={headshot} alt="" className='edit-profile__headshot'/>
                <img src={camera} alt="" className='edit-profile__camera-icon'/>
              </button>
              {/* <p className='edit-profile__subtext'> */}
              <button className='button--change-photo'>
                CHANGE PHOTO
              </button>
              {/* </p> */}
              <input
                  type="file"
                  name="photo"
                  id='photo'
                  ref={hiddenFileInput}
                  multiple={false}
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleChange}
                  style={{display: 'none'}} 
                  className='simple-file-upload'
              />   
            </div>
            <label htmlFor="name" className='form__label'>Name</label>
            <input id='name' type="text" placeholder='Enter your name..' className='form__input'/>
            <label htmlFor="Bio" className='form__label'>Bio</label>
            <textarea name='bio' rows="4" type="text" placeholder='Enter your bio..' className='form__input form__label--textarea'/>
            <label htmlFor="Phone" className='form__label'>Phone</label>
            <input id='phone' type="phone" placeholder='Enter your phone..' className='form__input'/>
            <label htmlFor="email" className='form__label'>Email</label>
            <input id='email' type="email" placeholder='Enter your email..' className='form__input'/>
            <label htmlFor="password" className='form__label'>Password</label>
            <input id='password' type="password" placeholder='Enter your new password..' className='form__input'/>
            <button className='button button--save'>Save</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}
