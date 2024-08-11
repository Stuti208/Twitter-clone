import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import twitterImage from "../../assets/images/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Login.css';
import auth from '../../firebase.init.js'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(email, password);
    
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
            style={{ color: 'black'}}></input>
          
          <input type="password"
            className='password form-option'
            placeholder='Password'
            onChange={(e) => { setPassword(e.target.value) }}
            style={{ color: 'black'}}></input>
          
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
