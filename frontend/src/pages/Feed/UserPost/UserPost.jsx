import React,{useContext,useEffect} from 'react'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import image from '../../../assets/images/scenery.jpg'
import { useState } from 'react';
import './UserPost.css'
import axios from 'axios'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { profileImageContext,loggedInUserContext,postStatusContext, bookmarkStatusContext, likeStatusContext, notificationsEnabledContext } from '../../../Context/Context';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import useLoggedInUser from '../../../hooks/useLoggedInUser';


const UserPost = ({post,setPosts}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const value = useContext(profileImageContext)
  const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;
  
  const postValue = useContext(postStatusContext);
  const bookmarkValue = useContext(bookmarkStatusContext);
  const likeValue = useContext(likeStatusContext);
  

  
  // const [bookmarkStatus, setBookmarkStatus] = useState(post.bookmark?post.bookmark:false);



  // useEffect(() => {
  
  //   if (user) {
  //       const email = user[0].email;

  //       fetch(`http:/loggedInUser?email=${email}`)
  //        .then(res => res.json())
  //        .then(data => {
  //               setLoggedInUser(data[0]);
  //         })
  //   }
  // }, [value.profileImage]);

  // const toggleBookmarkStatus = () => {
  //   if(bookmarkStatus)
  //      setBookmarkStatus(false);
  //   else
  //     setBookmarkStatus(true);
    
  //   console.log(bookmarkStatus);

  // }

 

    
  const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    
  const handleClose = () => {
        setAnchorEl(null);
  }
  
  const handleDeletePost = async () => {
    const res = await axios.delete(`https://twitter-clone-0b2e.onrender.com/deletepost/${post._id}`)
    console.log(res);
    postValue.changePostStatus();
  }

  const handleBookmark = async() => {
    // console.log(bookmarkStatus);
    
    let bookmarkVal = '';

     if (post.bookmark === 'true')
       bookmarkVal = 'false';
     else
       bookmarkVal = 'true';

    const bookmark ={
       bookmark:bookmarkVal
    }

    console.log(bookmark.bookmark)

    axios.patch(`https://twitter-clone-0b2e.onrender.com/uniquePostUpdate/${post._id}`, bookmark)
      .then(res => console.log(res))
    
    bookmarkValue.toggleBookmarkStatus();

  }


  const handleLike = async() => {
    // console.log(bookmarkStatus);
    
    let likeVal = '';

     if (post.like === 'true')
        likeVal = 'false';
     else
        likeVal = 'true';

    const like ={
      like:likeVal
    }

    // console.log(bookmark.bookmark)

    axios.patch(`https://twitter-clone-0b2e.onrender.com/uniquePostUpdate/${post._id}`, like)
      .then(res => console.log(res))
    
      likeValue.toggleLikeStatus();
  }

  return (
    <>

   <div className="post-container">
       {
           post.profileImage ?
            <img src={post.profileImage} className='userpost-profileimage'/>:
            <Avatar style={{scale:'1',float:'left'}}></Avatar>
        }
      
        <div className="post-header">
          
          <div className="post-userinfo">
            <h4>{post.name}</h4>
            <VerifiedIcon style={ {scale:'1.1', color:"rgb(81, 192, 236)",paddingTop:"6px"}} />
            <h5>@{post.username}</h5>
          </div>
              
         <IconButton
            // className='profile-more'
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}>
            <MoreHorizIcon/>
        </IconButton>
              
        <Menu className='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose} >
          <MenuItem >
             <Button onClick={handleDeletePost}>Delete</Button>
          </MenuItem>
              </Menu>
          </div>
          
        <div className="post-content">
          <p>{post.post }</p>

          <img src={post.image}
            style={ {borderRadius:'35px'}} />
        </div>
        
        <div className="post-footer">

          <IconButton
             style={{ marginLeft: '10px',marginRight:'10px',marginTop:'-9px' }}
             onClick={handleLike}>
             <FavoriteBorderIcon style={{ color:post.like==='true'?'red':'grey'}} />
          </IconButton>
     
          <ChatBubbleOutlineIcon style={{ color: 'grey' }} />

          <IconButton
            style={{ marginLeft: '190px',marginTop:'-9px' }}
            onClick={handleBookmark}>
            <BookmarkBorderIcon style={{ color:post.bookmark==='true'?'rgb(6, 166, 230)':'grey'}} />
          </IconButton>
        </div>
      
        </div>

      </>
  )
}

export default UserPost;
