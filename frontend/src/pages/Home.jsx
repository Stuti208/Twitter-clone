import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed/Feed'
import Widgets from './Widgets/Widgets'
import '../App.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom';
import useLoggedInUser from '../hooks/useLoggedInUser'
import { profileImageContext,loggedInUserContext,editStatusContext,postStatusContext,bookmarkStatusContext,likeStatusContext} from '../Context/Context';


const Home = () => {

  const user = useAuthState(auth);
  // console.log(user);
  // console.log(user[0].email)

  const [loggedInUser,setLoggedInUser] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [editStatus, setEditStatus] = useState(false);
  const [postStatus, setPostStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  
  // console.log(loggedInUser);

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

    </>
  )
}

export default Home
