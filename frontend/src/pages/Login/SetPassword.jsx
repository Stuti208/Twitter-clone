import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import './SetPassword.css';
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios'



const SetPassword = () => {
  const [password, setPassword] = useState('');
 const [updatePassword, updating, error] = useUpdatePassword(auth);


    
    const handlePasswordChange = async() => {
        const success = await updatePassword(password);
        if (success) {
          alert('Updated password');
        }

        const userProfile = {
            password: password,
          }
          
        axios.patch(`https://twitter-clone-0b2e.onrender.com/userUpdates/${loggedInUser.email}`, userProfile)
         .then(res => console.log(res))
  }
    
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
    
  if (updating) {
    return <p>Updating...</p>;
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
                  Create new password
          </div>

         <input type="text"
            className='email form-option'
            onChange={(e) => { setPassword(e.target.value) }}
            style={{ color: 'black' }}></input>
            
              <p>or</p>
              
              <button>
                  Generate random password
              </button>
          
          <div className="next-btn">
                  <button
                      className='btn'
                      onClick={handlePasswordChange}
                  >
                      Set Password
                  </button>
              </div>
         
        </div>
    </div>
  )
}

export default SetPassword
