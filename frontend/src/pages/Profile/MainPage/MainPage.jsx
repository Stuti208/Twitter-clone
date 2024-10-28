import React, { useState,useEffect,useContext } from 'react'
import './MainPage.css'
import coverIcon from '../../../assets/images/coverImage.jpg'
import { Avatar, Button, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate} from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import EditIcon from '@mui/icons-material/Edit';import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init.js';
import AddIcon from '@mui/icons-material/Add';import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UserPost from '../../Feed/UserPost/UserPost.jsx'
import { profileImageContext,loggedInUserContext ,postStatusContext, bookmarkStatusContext, likeStatusContext, notificationsEnabledContext, followContext} from '../../../Context/Context';
import EditProfile from '../EditProfile/EditProfile';
import Form from 'react-bootstrap/Form';
// import axios from 'axios'


const MainPage = ({loggedInUser,setLoggedInUser}) => {
  
  const [userPosts, setUserPosts] = useState([]);
  // const [postStatus, setPostStatus] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [userData, setUserData] = useState();
  const [friends, setFriends] = useState();
  

  // const [notificationsEnabled, setNotificationsEnabled] = useState(
  //   JSON.parse(localStorage.getItem('notificationsEnabled')) || false);

  // const [profileImage, setProfileImage] = useState();

  const value = useContext(profileImageContext);
  const postValue = useContext(postStatusContext);
  const bookmarkValue = useContext(bookmarkStatusContext);
  const likeValue = useContext(likeStatusContext);
  const notificationStatus = useContext(notificationsEnabledContext);
  const followStatus = useContext(followContext);

  // const notificationsEnabled = notificationStatus.notificationsEnabled;
  // const setNotificationsEnabled = notificationStatus.setNotificationsEnabled;
  const navigate = useNavigate();

  const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});

  // const userValue=useContext(loggedInUserContext)
  // const loggedInUser = userValue.loggedInUser;

  useEffect(() => {

    if (user && user[0].email===loggedInUser.email) {
        const email = user[0].email;

        fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
         .then(res => res.json())
         .then(data => {
                setLoggedInUser(data[0]);
          })
    }
  }, [coverImage,value.profileImage]);


  useEffect(() => {

    fetch(`https://twitter-clone-0b2e.onrender.com/userPost?email=${loggedInUser.email}`)
      .then(res => res.json())
      .then(async (data) => {
         setUserPosts(data);
         console.log(data)
      })
    
  }, [postValue.postStatus,bookmarkValue.bookmarkStatus,likeValue.likeStatus,loggedInUser]);


  useEffect(() => {
        const email = user[0].email;

        fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUserFriends?email=${email}`)
         .then(res => res.json())
         .then(data => {
           setFriends(data[0]);
           
           if (friends.following.includes(loggedInUser._id))
             followStatus.setFollow('true')
           else
             followStatus.setFollow('false')
          })
    
  }, [loggedInUser,followStatus.follow]);

  // const changePostStatus = () => {
  //   if (postStatus)
  //     setPostStatus(false)
  //   else
  //   setPostStatus(true)
  // }


  const requestNotificationPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }
}

  const toggleNotifications = () => {
    notificationStatus.setNotificationsEnabled(!notificationStatus.notificationsEnabled);
    localStorage.setItem('notificationsEnabled', !notificationStatus.notificationsEnabled);

    if (!notificationStatus.notificationsEnabled) {
        requestNotificationPermission(); // Request permission if enabling
    }
};


  const handleUploadCoverImage = (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image);

    axios.post('https://api.imgbb.com/1/upload?key=2f52efed5e338fab7b042d1a5725375c', formData)
      .then((res) => {
        const url = res.data.data.display_url;
        console.log(url);

        const userCoverImage = {
          coverImage:url
       }
   
       axios.patch(`https://twitter-clone-0b2e.onrender.com/userUpdates/${loggedInUser.email}`, userCoverImage)
          .then(res => console.log(res))
        
        setCoverImage(url);
        
      })
    
    
    
  }

  const handleUploadProfileImage = (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image);

    axios.post('https://api.imgbb.com/1/upload?key=2f52efed5e338fab7b042d1a5725375c', formData)
      .then((res) => {
        const url = res.data.data.display_url;
        console.log(url);

        const userProfileImage = {
          profileImage:url
        }
        
        // userdata update
        axios.patch(`https://twitter-clone-0b2e.onrender.com/userUpdates/${loggedInUser.email}`, userProfileImage)
          .then(res => console.log(res))
        
        value.setProfileImage(url);

        // postdata update
        axios.patch(`https://twitter-clone-0b2e.onrender.com/postUpdates/${loggedInUser._id}`, userProfileImage)
          .then(res => console.log(res))
      })
  }

  const handleBack = () => {
      const email = user[0].email;

      fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data => {
            setLoggedInUser(data[0]);
            console.log(data[0])
        })
    navigate('/home')
  }

  const handleFollow = () => {

    if(followStatus.follow == 'true')
      followStatus.setFollow('false')
    else 
      followStatus.setFollow('true')

    const email = user[0].email;

    fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data[0]);
        console.log(data[0])
      })

    
    if (followStatus.follow == 'true') {
          
          const user1Profile = {
            following: [loggedInUser._id]
          }
          
          axios.patch(`https://twitter-clone-0b2e.onrender.com/addfriendUpdates/${userData._id}`, user1Profile)
            .then(res => console.log(res))
        
        
          const user2Profile = {
            followers: [userData._id]
          }
          
          axios.patch(`https://twitter-clone-0b2e.onrender.com/addfriendUpdates/${loggedInUser._id}`, user2Profile)
            .then(res => console.log(res))
    }

    else {

      const user1Profile = {
        following: [loggedInUser._id]
      }
      
      axios.patch(`https://twitter-clone-0b2e.onrender.com/deletefriendUpdates/${userData._id}`, user1Profile)
        .then(res => console.log(res))
    
    
      const user2Profile = {
        followers: [userData._id]
      }
      
      axios.patch(`https://twitter-clone-0b2e.onrender.com/deletefriendUpdates/${loggedInUser._id}`, user2Profile)
        .then(res => console.log(res))
    }


  }


  return (
    <>
      
      <div>
       <div className="backgroundimage">
          <div className="mainpage-header">
           
            <IconButton
              style={{ position: 'relative', top: '-3px' }}
              onClick={handleBack}>
                <ArrowBackIcon />
            </IconButton>
                
            

      <div className="header-container">
          <div className="header-info">
            <h2>{loggedInUser.name}</h2>
            <p>{ userPosts.length} posts</p>
          </div>
   
              {
                user && user[0].email === loggedInUser.email &&
                  (
                    <label>
                      <input style={{ scale: '1.4', marginRight: '10px' }}
                        type="checkbox"
                        checked={notificationStatus.notificationsEnabled}
                        onChange={toggleNotifications}
                      />
                      Enable Notifications
                  </label>
                  )
              }

      </div>
            
      </div>
      
      <div className="cover-image">
          {  loggedInUser.coverImage?
                <img
                  src={loggedInUser.coverImage}
                  style={{ width: "100%", height: '100%', objectFit: 'cover' }}/>:
              <img src={coverIcon} style={{ width: "100%", height: '100%', objectFit: 'cover' }} />
          }
            
            {
              user && user[0].email === loggedInUser.email &&
              (
                <label htmlFor='coverimage' className='select-coverimage'>
                  <EditIcon style={{ scale: '1.2', color: 'white', paddingTop: '5px' }} />
                </label>
              )
            }

            <input
              type='file'
              id='coverimage'
              style={{ display: 'none' }}
              onChange={handleUploadCoverImage}></input>
              
          
      </div>

      { user && user[0].email === loggedInUser.email?
            <EditProfile loggedInUser={loggedInUser} /> :
            <input type='button'
              value={followStatus.follow == 'false' ? 'Follow' : 'Following'}
              className={followStatus.follow=='false'? `editProfile-btn fbtn`:`editProfile-btn`}
              onClick={handleFollow}></input>
      }

      <div className="profile-image">
        {  loggedInUser.profileImage?
              <img
                src={loggedInUser.profileImage}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> :
              <Avatar style={{scale:'3.85',marginLeft:'58px',marginTop:'57px'}}/>
        }

            {
              user && user[0].email === loggedInUser.email &&
              (
                  <label htmlFor='profileimage' className='select-profileimage'
                    style={{
                      marginLeft: loggedInUser.profileImage ? '111px' : '120px',
                      top: loggedInUser.profileImage ? '-38px' : '15px'
                    }}>
                    <AddIcon
                      style={{ scale: '1.4', color: 'white', paddingTop: '8px' }} />
                    </label>
              )
            }

        <input
          type='file'
          id='profileimage'
          style={{ display: 'none' }}
          onChange={handleUploadProfileImage}></input>
      </div>

      <div className="profile-info">
        <h2>{loggedInUser.name}</h2>
        <p>@{loggedInUser.username}</p>
      </div>

        <div className="bio" style={{display:loggedInUser.bio?'block':'none'}}>
            <p>{loggedInUser.bio}</p>
      </div>

      <div className="additional-info">
        <div className="location" style={{display:loggedInUser.location?'flex':'none'}}>
           <LocationOnIcon style={{scale:'0.9'}} />
              <p>{ loggedInUser.location}</p>
        </div>
        
        <div className="joiningDate" >
           <CalendarMonthIcon style={{scale:'0.9'}} />
           <p>Joined July 2024</p>
        </div>
        </div>
      </div>

      <div className="posts">
        <h3>Tweets</h3>
      </div>

      <div
        className="post-status"
        style={{ display:userPosts.length!==0?"none":'block'}}>
        <h2>You haven't posted anything</h2>
      </div>

      {
        userPosts.slice().reverse().map(post => {
           return <UserPost key={post._id} post={post} changePostStatus={postValue.changePostStatus} />
        })
      }


        </div>
   </>
  )
}

export default MainPage;