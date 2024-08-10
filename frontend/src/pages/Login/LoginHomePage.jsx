// import React, { useState } from 'react'
import twitterImage from '../../assets/images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Login.css';
import axios from 'axios';
import auth from '../../firebase.init.js';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const LoginHomePage = () => {
  const navigate = useNavigate();

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const handleGoogleSignIn = async () => {
    const googleData = await signInWithGoogle();
    console.log(googleData.user);

    const username_array = googleData.user.displayName.split(' ');
    console.log(username_array);

    const userData = {
      name: googleData.user.displayName,
      email: googleData.user.email,
      username: `${username_array[0]}1234`,
    };

    const { data } = await axios.post(
      'http://localhost:3000/userdata',
      userData
    );
    console.log(data);
  };

  if (googleUser) {
    navigate('/home');
    console.log(googleUser);
  }

  if (googleError) {
    console.log(googleError);
  }

  if (googleLoading) {
    console.log('loading....');
  }

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={twitterImage} alt="Twitter-image" />
        </div>
        <div className="form-container">
          <TwitterIcon className="Twitter-icon" style={{ fontSize: '37px' }} />
          <h1 className="heading-1">Happening now</h1>
          <h1 className="heading-2">Join Twitter today</h1>

          <div className="google-button">
            <GoogleButton
              className="g-button"
              type="light"
              style={{
                borderRadius: '30px',
                paddingLeft: '15px',
                marginTop: '40px',
                marginLeft: '80px',
                size: 'larger',
                shape: 'rectangular',
                width: '280px',
              }}
              onClick={handleGoogleSignIn}
            />
          </div>

          <div className="or-class">
            <div className="div-1"></div>
            <p>or</p>
            <div className="div-2"></div>
          </div>

          <button className="signup-btn">
            <Link to="/signup" style={{ color: 'white' }}>
              Sign in with phone or email
            </Link>
          </button>

          <div className="login-class">
            Already have an account?
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: 'rgb(81, 192, 236)',
                marginLeft: '7px',
                fontWeight: '600',
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </>
  );
};

export default LoginHomePage;
