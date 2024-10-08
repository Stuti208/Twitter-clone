import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import twitterImage from "../../assets/images/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Login.css';
import auth from '../../firebase.init.js'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IconButton } from '@mui/material';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passType,setPassType]=useState('password')

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  if (user) {
    navigate('/home');
    console.log(user);
  }

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log('loading....');
  }


  const handlePassType = () => {
    if (passType === 'password')
      setPassType('text')
    else
      setPassType('password')
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(email, password);
    console.log(user)
    
    const res = await axios.get("https://twitter-clone-0b2e.onrender.com/loggedInUser", {
      params:{email:email}
    })
    console.log(res)
  }


  return (
    <>

    <div className="login-container">
      <div className="image-container">
        <img src={twitterImage} alt="Twitter-image"/>
      </div>
      <div className="form-container">
        <TwitterIcon className='Twitter-icon'
                  style={{ fontSize:'37px'}}/>
        <h1 className="heading-1">Happening now</h1>
        <h1 className="heading-2">Log in to Twitter</h1>

        <form className='form' onSubmit={handleSubmit}>

          <input type="email"
            className='email form-option'
            placeholder='Email'
            onChange={(e) => { setEmail(e.target.value) }}
            style={{ color: 'black' }}
            required>
          </input>
          
          <input type={passType}
            className='password form-option'
            placeholder='Password'
            onChange={(e) => { setPassword(e.target.value) }}
            style={{ color: 'black' }}
            required></input>

            <IconButton
              className="show-password"
              onClick={handlePassType}>
              
              {
                passType === 'password' ?
                <VisibilityIcon style={{ scale: '0.8' }} /> :
                <VisibilityOffIcon style={{ scale: '0.8' }} />           
              }
              
            </IconButton>

            <Link
              to='/password-reset'
              className="forgot-pass-btn" >
               Forgot password?
            </Link>
          
          <div className="login-btn">
            <button type='submit' className='btn'>Login</button>
          </div>
         
        </form>

        <div className='login-class'>
            Don't have an account?
                  <Link
                      to='/'
                      style={{textDecoration:'none',color:'rgb(81, 192, 236)',marginLeft:'7px',fontWeight:'600'}}>
                      Sign up
                  </Link>
        </div>
      </div>
     
    </div>

   <div className="footer"></div>
  </>

  )
}

export default Login
