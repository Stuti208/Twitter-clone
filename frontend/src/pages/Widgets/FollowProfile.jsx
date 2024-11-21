import React, { useContext, useEffect, useState } from 'react'
import './FollowProfile.css'
import { Avatar, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { followContext, loggedInUserContext, profileContext } from '../../Context/Context'
import { useTranslation } from 'react-i18next'

const FollowProfile = ({ data }) => {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const profile = useContext(profileContext);
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;
  const followStatus = useContext(followContext);
  const [followS,setFollowS]=useState('false')

  const [friends,setFriends]=useState({})
  
   const openProfile = () => {
      profile.setProfile(data);
      navigate('profile')
  }
  
  useEffect(() => {

      const email = loggedInUser.email;
      fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUserFriends?email=${email}`)
      .then(res => res.json())
      .then(d => {
        setFriends(d[0]);
           
        if (friends.following.includes(data._id))
          setFollowS('true')
        else
          setFollowS('false')
      })
    
  }, [followStatus.follow,data]);

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
          {
            followS === 'true' ?
              <input type='button' value={t("following")} className="following-btn" onClick={openProfile}></input>:
              <input type='button' value={t("follow")} className="follow-btn" onClick={openProfile}></input>
          }

            </div>
            </div>
  )
}

export default FollowProfile
