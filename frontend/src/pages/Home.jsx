import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed/Feed'
import Widgets from './Widgets/Widgets'
import '../App.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom';
import useLoggedInUser from '../hooks/useLoggedInUser'
import { profileImageContext,loggedInUserContext,editStatusContext,postStatusContext,bookmarkStatusContext,likeStatusContext,notificationsEnabledContext,profileContext} from '../Context/Context';


const Home = () => {

  const user = useAuthState(auth);
  // console.log(user);
  // console.log(user[0].email)

  const [loggedInUser,setLoggedInUser] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [profile, setProfile] = useState('');
  const [editStatus, setEditStatus] = useState(false);
  const [postStatus, setPostStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem('notificationsEnabled')) || false);

  
  // console.log(loggedInUser);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
              console.log('Notification permission granted.');
          } else {
              console.log('Notification permission denied.');
          }
      });
    }
    
    else {
      console.log('This browser does not support notifications.');
  }
  },[])

  const handleLogOut = () => {
    signOut(auth);
  }

  const toggleEditStatus = () => {
    if (editStatus)
      setEditStatus(false);
    else
    setEditStatus(true);
  }

  const toggleBookmarkStatus = () => {
    if (bookmarkStatus)
      setBookmarkStatus(false);
    else
    setBookmarkStatus(true);
  }

  const toggleLikeStatus = () => {
    if (likeStatus)
      setLikeStatus(false);
    else
    setLikeStatus(true);
  }


  const changePostStatus = () => {
    if (postStatus)
      setPostStatus(false)
    else
    setPostStatus(true)
  }

  return (
    <>
      {/* <profileContext.Provider value={{ profile, setProfile }}> */}
      <notificationsEnabledContext.Provider value={{ notificationsEnabled, setNotificationsEnabled }}>
      <loggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <editStatusContext.Provider value={{editStatus,setEditStatus,toggleEditStatus}}>
      <postStatusContext.Provider value={{postStatus,setPostStatus,changePostStatus}}>
      <bookmarkStatusContext.Provider value={{bookmarkStatus,setBookmarkStatus,toggleBookmarkStatus}}>
      <likeStatusContext.Provider value={{likeStatus,setLikeStatus,toggleLikeStatus}}>
      <profileImageContext.Provider value={{ profileImage, setProfileImage }}>
                
      <div className='home'>
          <Sidebar handleLogOut={handleLogOut} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
          <Outlet/>
          <Widgets/>
      </div>
            
      </profileImageContext.Provider>
      </likeStatusContext.Provider>
      </bookmarkStatusContext.Provider>
      </postStatusContext.Provider>
      </editStatusContext.Provider>
      </loggedInUserContext.Provider>
        </notificationsEnabledContext.Provider>
        {/* </profileContext.Provider> */}

    </>
  )
}

export default Home
