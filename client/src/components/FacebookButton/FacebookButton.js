import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import fbLogo from '../../assets/Facebook.svg';

export default function FacebookButton() {

    const responseFacebook = (response) => {
        console.log(response);
      }
  return (
    <div>
        <FacebookLogin
        appId="1088597931155576"
        autoLoad
        callback={responseFacebook}
        render={renderProps => (
        <button onClick={renderProps.onClick}>
            <img src={fbLogo} alt="" className='social-icons'/>
        </button>
        )}
        />
    </div>
  )
}
