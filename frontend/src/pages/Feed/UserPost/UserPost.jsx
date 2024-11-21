import React,{useContext,useEffect, useRef} from 'react'
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next'


const UserPost = ({post,setPosts,videos}) => {

  const { t } = useTranslation();
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
  
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0); // Track current video index
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [displayComment, setDisplayComment] = useState(false);
  
  

  
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

 
  const handleModalClose = () => {
    setOpen(false);
    setDisplayComment(false);
    setComment('');
  }
    
  const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    
  const handleClose = () => {
        setAnchorEl(null);
  }

  const handleComments = () => {
    setOpen(true);
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

  const handleGesture = (e) => {
    const tapLocation = e.clientX / window.innerWidth;
    const now = new Date().getTime();
    const timeBetweenTaps = now - lastTapTime;

    if (timeBetweenTaps > 500) {
      setTapCount(1);
    } else {
      setTapCount((prev) => prev + 1);
    }

    setLastTapTime(now);

    if (tapCount === 1) {
      if (tapLocation > 0.3 && tapLocation < 0.7) {
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    } else if (tapCount === 2) {
      if (tapLocation > 0.65) {
        videoRef.current.currentTime += 10; 
      } else if (tapLocation < 0.35) {
        videoRef.current.currentTime -= 10;
      }
    }

    else if (tapCount === 3) {
      if (tapLocation > 0.35 && tapLocation < 0.65) {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
        console.log(videos)
      } 
      else if (tapLocation > 0.65) {
        window.close(); 
        alert("Are you trying to close the website?")
      }
      else if (tapLocation < 0.35) {
        // alert('Showing comments');
        setOpen(true);
      }
      
    };
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
              <Button onClick={handleDeletePost}>{ t("delete")}</Button>
          </MenuItem>
              </Menu>
          </div>
          
        <div className="post-content">
          <p>{post.post }</p>

          {
           post.image && <img src={post.image}
            style={{ borderRadius: '35px' }} />
          }

          {
            post.video &&
            <div onClick={handleGesture} style={{marginLeft:'50px',marginTop:'13px',marginBottom:'5px'}}>
                <video
                  src={post.video}
                  ref={videoRef}
                  controls
                  style={{ borderRadius: '20px',width:'97%' }} />
              </div>
          }
        </div>
        
        <div className="post-footer">

          <IconButton
             style={{ marginLeft: '10px',marginRight:'10px',marginTop:'-9px' }}
             onClick={handleLike}>
             <FavoriteBorderIcon style={{ color:post.like==='true'?'red':'grey'}} />
          </IconButton>
     
          <IconButton onClick={handleComments}>
             <ChatBubbleOutlineIcon style={{ color: 'grey' }} />
          </IconButton>
          
          <IconButton
            className='bookmark-icon'
            onClick={handleBookmark}>
            <BookmarkBorderIcon style={{ color:post.bookmark==='true'?'rgb(6, 166, 230)':'grey'}} />
          </IconButton>
        </div>
      
      </div>
      
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className='comment-container'>
          <div className="editpage-header" style={{borderBottom:'1px solid grey',paddingBottom:'10px'}}>
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleModalClose} >
                
                <CloseIcon className='close-icon'
                  style={{transform: 'scale(1.2)'}}>
                </CloseIcon>
            </IconButton>
            
            <h2 className='editpage-heading' style={{ color: 'grey' }}>{t("comments")}</h2>
           
          </div> 
          
          { displayComment &&
            <div className="post-container display-comment" >
              {
                post.profileImage ?
                  <img src={post.profileImage} className='userpost-profileimage' /> :
                  <Avatar style={{ scale: '1', float: 'left' }}></Avatar>
              
              }
            
              <div className="post-header" style={{ display: 'block' }} >
                
                <div className="post-userinfo">
                  <h4>{post.name}</h4>
                  <VerifiedIcon style={{ scale: '1.1', color: "rgb(81, 192, 236)", paddingTop: "6px" }} />
                
                </div>

                <div className="comment">
                  <p>{comment}</p>
                </div>

              </div>
            </div>
          }
            {/* <button className='editpage-savebtn' onClick={handleSave}> Save</button> */}
         

          <div  className="send-comment" style={{top:displayComment?'57%':'73%'}}>
             {
              post.profileImage ?
                <img src={post.profileImage} className='userpost-profileimage'/>:
                <Avatar style={{scale:'1',float:'left'}}></Avatar>
            }

            <input type='text' placeholder='Add a comment..'
              style={{ color: 'black', backgroundColor: 'white', width: '78%', border: '1px solid grey', padding: '5px', borderRadius: '20px' }}
              onChange={(e) => setComment(e.target.value)}
              value={ comment} />
            
            <IconButton onClick={() => {
              if (comment!=='')
                setDisplayComment(true)
            }}>
              <SendIcon />
            </IconButton>
             
          </div>

         
         
        </Box>
      </Modal>

      </>
  )
}

export default UserPost;
