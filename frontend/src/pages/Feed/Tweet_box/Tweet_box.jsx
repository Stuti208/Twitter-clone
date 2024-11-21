import { Avatar, IconButton } from '@mui/material'
import React, { useState,useContext,useEffect } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios'
import './Tweet_box.css';
import CloseIcon from '@mui/icons-material/Close';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { profileImageContext,loggedInUserContext,postStatusContext } from '../../../Context/Context';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useTranslation } from 'react-i18next';
import VideoFileIcon from '@mui/icons-material/VideoFile';

const Tweet_box = () => {

  const { t } = useTranslation();
  const [post, setPost] = useState('');  
  const [imageURL, setImageURL] = useState(''); 
  const [videoURL, setVideoURL] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const value = useContext(profileImageContext)
  const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;
  const postValue = useContext(postStatusContext);

  const [friendsCount, setFriendsCount] = useState(0);
  const [postCount, setPostCount] = useState(0); 
  const [canPost, setCanPost] = useState(false); 
  const [message, setMessage] = useState(''); 


  // useEffect(() => {

  //   if (user) {
  //       const email = user[0].email;

  //       fetch(`http://localhost:3000/loggedInUser?email=${email}`)
  //        .then(res => res.json())
  //        .then(data => {
  //               setLoggedInUser(data[0]);
  //         })
  //   }
  // }, [value.profileImage]);


  useEffect(() => {
  
      const email=loggedInUser.email
          
      fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUserFriends?email=${email}`)
        .then(res => res.json())
        .then(data => {
          console.log(data[0]);
          setFriendsCount(data[0].following ? data[0].following.length : 0);
          console.log(friendsCount);
        })
    
      setPostCount(0)

}, [loggedInUser]);

  
  useEffect(() => {
    // console.log(postCount)
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const startPostingTime = new Date();
    startPostingTime.setHours(10, 0, 0, 0); // 10:00 AM IST
    const endPostingTime = new Date();
    endPostingTime.setHours(10, 30, 0, 0); // 10:30 AM IST

    console.log("Current Time:", currentDate);
    console.log("Start Posting Time:", startPostingTime);
    console.log("End Posting Time:", endPostingTime);

    console.log("Current Time:", currentDate.getTime());
    console.log("Start Posting Time:", startPostingTime.getTime());
    console.log("End Posting Time:", endPostingTime.getTime());

    if (friendsCount <=1) {
        if (currentTime >= startPostingTime.getTime() && currentTime <= endPostingTime.getTime() && postCount ===0) {
            setCanPost(true);
        } else {
            setCanPost(false);
            setMessage('You can only post once between 10:00 AM to 10:30 AM IST, Follow others to unlock your ability to post!');
        }
    }
   
    else if(friendsCount > 1 && friendsCount <= 10) {
        if (postCount < 2) {
            setCanPost(true);
        } else {
            setCanPost(false);
            setMessage('You have reached your post limit of 2 posts for today, Follow more people!');
        }
    }
   
    else if (friendsCount > 10) {
        setCanPost(true);
    }

    // Reset post count daily
    // const resetTime = new Date();
    // resetTime.setHours(0, 0, 0, 0); // Midnight reset
    
    // if (currentTime >= resetTime.getTime()) {
    //     setPostCount(0);
    // }
    
    
  }, [friendsCount, postCount]);
  

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    console.log(e.target.files[0])

    const formData = new FormData();
    formData.set('image', image);

     axios.post('https://api.imgbb.com/1/upload?key=2f52efed5e338fab7b042d1a5725375c', formData)
      .then((res) => {
        console.log(res);
        const url = res.data.data.display_url;
        setImageURL(url);
        console.log(imageURL)
        console.log(url);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      })
  }


  const handleUploadVideo = async(e) => {
    setIsLoading(true);
    const video = e.target.files[0];
    console.log(e.target.files[0])

    const formData = new FormData();
    formData.append('file', video);
    formData.append("upload_preset", "video_preset");
    
    try {
      let api = 'https://api.cloudinary.com/v1_1/dycgwxuuf/video/upload';

      let res=await axios.post(api, formData)
        
      const { secure_url } = res.data;
      console.log(secure_url);
      setVideoURL(secure_url);
      console.log(videoURL);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error)
      setIsLoading(false);
      
    }
    
  }


  const handleTweet = async (e) => {
    e.preventDefault();
    
    // if (canPost) {
    
      const userPost = {
        userid: loggedInUser._id,
        name: loggedInUser.name,
        username: loggedInUser.username,
        email: loggedInUser.email,
        post: post,
        image: imageURL,
        video: videoURL,
        profileImage: loggedInUser.profileImage
      }
      console.log(userPost);
    
      try {
    
        const res = await axios.post('https://twitter-clone-0b2e.onrender.com/post', userPost);
        console.log(res);
        postValue.changePostStatus();
     
        setImageURL('');
        setVideoURL('');
        setPost('');
        console.log(postCount)
        setPostCount(postCount+1);
        console.log(postCount)
        // e.target[0].value = '';
    
        // const postId = res.data.insertedId;
        // console.log(postId);

        // const data = axios.get('http://localhost:3000/postdata', { postId })
        // console.log(data)
      }
      catch (error) {
        console.log(error);
      }
    
      
    // } 

    // else {
    //   alert(message);
    // }
  }

  return (
    <div className='tweetBox'>
      <form onSubmit={handleTweet}>
        <div className="tweetBox-input">
         {
          loggedInUser.profileImage ?
            <img src={loggedInUser.profileImage} className='tweetbox-profileimage'/>:
            <Avatar style={{scale:'1.1'}}></Avatar>
         }
          <input
            type='text'
            className='textBox'
            placeholder={ t("header")}
            value={post}
            onChange={(e)=> { setPost(e.target.value)}}
          />
        </div>

        <div className="image-display" style={{display:imageURL || videoURL?'block':'none'}}>
          {imageURL &&
            <img
            src={imageURL}
            style={{
              width: '88%', minHeight: '180px', maxHeight: '400px', objectFit: 'cover',
              borderRadius: '18px', marginTop: "13px", marginLeft: "54px",
              position: 'relative', zIndex: '0'
            }} >
         
            </img>
          }
    
          {         
            videoURL && 
            <div style={{marginLeft:'54px',marginTop:'7px'}}>
               <video src={ videoURL} controls style={{ borderRadius: '20px',width:'95%',marginLeft:'45x',marginTop:'7px' }} />
            </div>
          }
          
          <IconButton 
            onClick={e => { setImageURL(''); setVideoURL('') }}
            className="tweet-close-btn">
            
             <CloseIcon className='close-icon'
               style={{transform: 'scale(1.3)'}}>
             </CloseIcon>
         </IconButton>
        
          
           
        </div>
        
        <div className="imageIcon-tweetBtn">
          <div className="files" style={{display:'flex',gap:'10px'}}>
          <label htmlFor='image' className='image-icon'>
            <AddPhotoAlternateIcon
              style={{ color:'rgb(56, 189, 241)'}} />
          </label>
          <input
            type='file'
            id='image'
            accept="image/*"
            className='image-input'
            style={{
              display: 'none'
            }}
            onChange={handleUploadImage} />
          

          <label htmlFor='video' className='image-icon'>
            <VideoFileIcon
              style={{ color:'rgb(56, 189, 241)'}} />
          </label>
          <input
            type='file'
            id='video'
            accept="video/*"
            className='image-input'
            style={{
              display: 'none'
            }}
            onChange={handleUploadVideo} />

       </div>
          <input type='submit'
            className='TweetBox-btn'
            value={t("tweet")}
            disabled={imageURL || post ? false : true}
            style={{
              color: imageURL || post ? "white" : "#e6dfdf",
              }}></input>
        </div>

      </form>
      
    </div>
  )
}

export default Tweet_box
