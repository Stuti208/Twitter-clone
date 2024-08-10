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

const Tweet_box = () => {

  const [post, setPost] = useState('');  
  const [imageURL, setImageURL] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const value = useContext(profileImageContext)
  const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;
  const postValue = useContext(postStatusContext);


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


  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];

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


  const handleTweet = async (e) => {
      e.preventDefault();
    
    const userPost = {
        userid: loggedInUser._id,
        name:loggedInUser.name,
        username: loggedInUser.username,
        email:loggedInUser.email,
        post: post,
        image: imageURL,
        profileImage:loggedInUser.profileImage
      }
    console.log(userPost);
    
    try {
    
      const res = await axios.post('http://localhost:3000/post', userPost);
      console.log(res);
      postValue.changePostStatus();
     
      setImageURL('');
      setPost('');
      // e.target[0].value = '';
    
      // const postId = res.data.insertedId;
      // console.log(postId);

      // const data = axios.get('http://localhost:3000/postdata', { postId })
      // console.log(data)
    }
    catch (error) {
      console.log(error);
    }
    
     
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
            placeholder="What is happening?"
            value={post}
            onChange={(e)=> { setPost(e.target.value)}}
          />
        </div>

        <div className="image-display" style={{display:imageURL?'block':'none'}}>
          <img
            src={imageURL}
            style={{
              width: '88%', minHeight:'180px',maxHeight: '400px', objectFit: 'cover',
              borderRadius: '18px', marginTop: "13px", marginLeft: "54px",
              position:'relative',zIndex:'0'
            }} >
          
          </img> 
          
          <IconButton 
            style={{position:'absolute', top:'108px', left:'859px',  zIndex: '1'}}
            onClick={e => setImageURL('')} >
            
             <CloseIcon className='close-icon'
               style={{transform: 'scale(1.3)'}}>
             </CloseIcon>
         </IconButton>
        
          
           
        </div>
        
        <div className="imageIcon-tweetBtn">
          <label htmlFor='image' className='image-icon'>
            <AddPhotoAlternateIcon
              style={{ color:'rgb(56, 189, 241)'}} />
          </label>
          <input
            type='file'
            id='image'
            className='image-input'
            style={{
              display: 'none'
            }}
            onChange={handleUploadImage} />

          <input type='submit'
            className='TweetBox-btn'
            value='Tweet'
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
