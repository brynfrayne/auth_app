import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../../assets/Google.svg';

export default function GoogleButton() {
    
    const responseGoogle = (response) => {
        console.log(response);
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
