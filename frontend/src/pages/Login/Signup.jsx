import React, { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import twitterImage from "../../assets/images/twitter2.jpg";
import TwitterIcon from '@mui/icons-material/Twitter';
import './Login.css';
import auth from '../../firebase.init.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';


const Signup = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [passType, setPassType] = useState('password')
  const [msg, setMsg] = useState("");


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

  const handlePassType = () => {
    if (passType === 'password')
      setPassType('text')
    else
      setPassType('password')
  }
  

  const generateRandomPassword = (length) => {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    
      const characters = uppercase + lowercase;
      let password = '';

      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         password += characters[randomIndex];
      }

      return password;
  }


  const handleClick = () => {
    const pass = generateRandomPassword(9);
    setPassword(pass);
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);
    if (password.length < 8) {
      setMsg("Password should be at least 8 characters");
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(email, password);

      const userData = {
        name: name,
        username: username,
        email: email,
        password: password
      }

      const { res } =await axios.post('https://twitter-clone-0b2e.onrender.com/userdata', userData)
      console.log(res)


    fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
      .then(res => res.json())
      .then(async (data) => {
          console.log(data[0])
        
          const friendsData = {
              userid: data[0]._id,
              email: email,
              followers: [],
              following:[],
          }
        
          const { r } =await axios.post('https://twitter-clone-0b2e.onrender.com/friendsdata', friendsData)
          console.log(r)
      })

      
      
      navigate('/login');
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!!, Please try again.")
    }
  }
    
  return (
   <>

    <div className="login-container">
      <div className="image-container">
        <img src={twitterImage} alt="Twitter-image"/>
      </div>
      <div className="form-container">
        {/* <TwitterIcon className='Twitter-icon'
                  style={{ fontSize:'37px'}}/> */}
        <h1 className="signup-form-heading">Happening now</h1>
        <h1 className="heading-2">Sign in to Twitter</h1>

        <form className='form' onSubmit={handleSubmit}>  

        <input type="text"
            className='display-name form-option'
            placeholder='Name'
            onChange={(e) => { setName(e.target.value) }}
            style={{ color: 'black' }}
            required></input> <br/>        

       <input type="text"
            className='display-username form-option'
            placeholder='@username'
            onChange={(e) => { setUsername(e.target.value) }}
            style={{ color: 'black' }}
            required></input><br/>
                       
          <input type="email"
            className='form-option'
            placeholder='Email'
            onChange={(e) => { setEmail(e.target.value) }}
              style={{ color: 'black' }}
            required></input>
          
            <p style={{color:'red',marginLeft:'5px'}}>{msg}</p>
          <input type={passType}
            className='password form-option'
            value={password}
            placeholder='Password'
              onChange={(e) => { setPassword(e.target.value);setMsg("") }}
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
            
            <div>
              <input type='button'
                className="pass-gen"
                onClick={handleClick}
                value='Generate Random Password'></input>
            </div>
          
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
