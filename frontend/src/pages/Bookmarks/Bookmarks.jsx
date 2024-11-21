import React, { useContext, useEffect, useState } from 'react'
import '../Feed_Page.css'
import './Bookmark.css'
import { postStatusContext,loggedInUserContext, bookmarkStatusContext } from '../../Context/Context';
import UserPost from '../Feed/UserPost/UserPost';
import axios from 'axios'
import { useTranslation } from 'react-i18next';

const Bookmarks = () => {
  const { t } = useTranslation();
  const { line1, line2, line3 } = t("bookmark");

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
        <h2>{ t("component5")}</h2>
        <p>@{loggedInUser.username}</p>
      </div>

      <div className="bookmark-content" style={{display:userPosts.length===0?'block':'none'}}>
            <h1>{ line1}</h1>
            <p>{ line2}<br/>{ line3}</p>
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