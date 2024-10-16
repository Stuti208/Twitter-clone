import React, { useContext, useEffect, useState } from 'react'
import './FollowProfile.css'
import { Avatar, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { profileContext } from '../../Context/Context'

const FollowProfile = ({ data }) => {

  const navigate = useNavigate();
  const profile = useContext(profileContext);
  
   const openProfile = () => {
      profile.setProfile(data);
      navigate('profile')
   }

    return (
      <div>
            <div className="follow_container">
                
            <div className="profile-section">
                    {
                        data.profileImage ?
                        <img src={data.profileImage} className='sidebar-profileimage' /> :
                        <Avatar style={{ scale: '1.1' }}></Avatar>
                    }  
                        
                <div className="user-info info">
                    <button onClick={openProfile}>
                      <h4>{data.name}</h4>
                    </button>
                    <h5>@{data.username}</h5>
                </div>
                    
         </div>
          
          <input type='button' value='Follow' className="follow-btn"></input>
      
            </div>
            </div>
  )
}

export default FollowProfile
