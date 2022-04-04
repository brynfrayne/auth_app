import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../../assets/Google.svg';

export default function GoogleButton() {
    
    const responseGoogle = (googleData) => {
        console.log(googleData);
        axios.get('http://localhost:8000/auth/google', 
          {token:googleData.tokenId}
          )
      }

  return (
    // <div>
    <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <img src={googleLogo} alt="" className='social-icons'/>
      </button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    // </div>
  )
}
