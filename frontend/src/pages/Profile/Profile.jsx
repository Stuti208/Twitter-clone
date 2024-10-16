import React, { useContext } from 'react'
import '../Feed_Page.css'
import MainPage from './MainPage/MainPage';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { profileContext } from '../../Context/Context';

const Profile = () => {
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});
  const profile=useContext(profileContext)

  return (
    <div className='feed-page'>
      <div className="profilePage">
        <MainPage loggedInUser={profile.profile} setLoggedInUser={profile.setProfile} />
       </div>
    </div>
  )
}

export default Profile;
