import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import twitterImage from "../../assets/images/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Login.css';
import auth from '../../firebase.init.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');


  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
   ] = useCreateUserWithEmailAndPassword(auth);
    
   
  if (user) {
    console.log(user);
  }

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log('loading....');
  }
  
   
  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(email);
     console.log(password);
    
    try {
      await createUserWithEmailAndPassword(email, password);

      const userData = {
        name: name,
        username: username,
        email: email,
        password: password
      }

      const { data } =await axios.post('https://twitter-clone-0b2e.onrender.com/userdata', userData)
      console.log(data)
      
      navigate('/login');
    }
    catch (error) {
      console.log(error);
    }
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
        <h1 className="heading-2">Sign in to Twitter</h1>

        <form className='form' onSubmit={handleSubmit}>  

        <input type="text"
            className='display-name form-option'
            placeholder='Name'
            onChange={(e) => { setName(e.target.value) }}
            style={{ color: 'black'}}></input>         

          <input type="text"
            className='display-username form-option'
            placeholder='@username'
            onChange={(e) => { setUsername(e.target.value) }}
            style={{ color: 'black'}}></input>
                       
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
            <button type='submit' className='btn'>Sign up</button>
          </div>
         
        </form>
        
      </div>
    </div>
    
    <div className="footer"></div>
   </>    
      
  )
}

export default Signup
