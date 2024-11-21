import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react'
import axios from 'axios'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth, { db } from '../../firebase.init';
import { doc, getDoc } from 'firebase/firestore';


const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const [requestError, setRequestError] = useState('');
  const [lastRequested, setLastRequested] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    
        if (email) {
          fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
          .then(res => res.json())
          .then(data => {
            console.log(data[0])
            setLastRequested(`${data[0].lastRequested ? data[0].lastRequested : null}`)
            // console.log(lastRequested)

           })
         };

      setRequestError('');
  }, [email]);

  


  const handleClick= async () => {
    

    const now = new Date();
    console.log(now);
    
    if (lastRequested) {

      const temp = new Date(lastRequested);
      console.log(temp)
      // console.log(temp.getTime())
      // const res = new Date(temp);
       if (now.getTime() - temp.getTime() < 86400000) {
            setRequestError('You can only request a password reset once a day.');
            return;
        }
    }

    try {
        // Send the password reset email
        const success=await sendPasswordResetEmail(email, actionCodeSettings);
        if (success) {
          alert('Sent email');
        }
      
       const userProfile = {
         lastRequested:now
       }
      
      axios.patch(`https://twitter-clone-0b2e.onrender.com/userUpdates/${email}`, userProfile)
        .then(res => console.log(res))
      
    }
    catch (err) {
      console.log(err.message);
    }
    
  }


  const actionCodeSettings = {
    url: 'https://twitter-twitter-clone.netlify.app//login',
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (sending) {
    return <p>Sending...</p>;
  }

    
  return (
      <div className='forgetPass-container'>
          <div className='box-container'>
              
           <TwitterIcon className='Twitter-icon'
                  style={{ scale:'1.9',marginTop:'25px',marginLeft:'230px'}}/>

          <h1 className="main-heading">
             Find your Twitter account
          </h1>

          <div className="forgetPass-detail">
          Enter the email associated with your account to change your <br/>password.
          </div>

          {requestError && <p style={{color:'red',marginTop:'20px'}}>{requestError}</p>}
        
         <input type="email" required
            className='email form-option'
            placeholder='Email'
            onChange={(e) => { setEmail(e.target.value) }}
            style={{ color: 'black' }} ></input>
          
          <div className="next-btn">
                  <button type='submit' className='btn' onClick={handleClick}>
                      Reset Password
                  </button>
          </div>
         
        </div>
    </div>
  )
}

export default ForgetPassword
