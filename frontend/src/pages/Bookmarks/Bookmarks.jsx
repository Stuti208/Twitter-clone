import React, { useContext, useEffect, useState } from 'react'
import '../Feed_Page.css'
import './Bookmark.css'
import { postStatusContext,loggedInUserContext, bookmarkStatusContext } from '../../Context/Context';
import UserPost from '../Feed/UserPost/UserPost';
import axios from 'axios'

const Bookmarks = () => {

  const [userPosts, setUserPosts] = useState([]);
  const postValue = useContext(postStatusContext);
  const bookmarkValue = useContext(bookmarkStatusContext);


  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;

  useEffect(() => {
    
    const bookmark = true;

    fetch(`https://twitter-clone-0b2e.onrender.com/bookmarkUserPost?bookmark=${bookmark}`)
      .then(res => res.json())
      .then(async (data) => {
         setUserPosts(data);
         console.log(data)
      })
    
  }, [postValue.postStatus,bookmarkValue.bookmarkStatus,loggedInUser]);


  return (
    <div className='feed-page'>

      <div className="bookmark-header">
        <h2>Bookmark</h2>
        <p>@{loggedInUser.username}</p>
      </div>

      <div className="bookmark-content" style={{display:userPosts.length===0?'block':'none'}}>
            <h1>Save posts for later</h1>
            <p>Bookmark posts to easily find them again in the<br/> future.</p>
      </div>

      {
          userPosts.slice().reverse().map(post => {
           return <UserPost key={post._id} post={post} changePostStatus={postValue.changePostStatus} />
          })
       }
    </div>
  )
}

export default Bookmarks;