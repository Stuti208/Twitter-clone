import React, { useState,useEffect, useContext } from 'react'
import './Feed.css'
import '../Feed_Page.css'
import Tweet_box from './Tweet_box/Tweet_box.jsx'
import UserPost from './UserPost/UserPost.jsx'
import { bookmarkStatusContext, likeStatusContext, notificationsEnabledContext, postStatusContext, profileImageContext } from '../../Context/Context'
import axios from 'axios'

const Feed = () => {

  const [posts, setPosts] = useState([]);
  // const [postStatus, setPostStatus] = useState(false);
  const value = useContext(profileImageContext)
  const postValue = useContext(postStatusContext);
  const bookmarkValue = useContext(bookmarkStatusContext);
  const likeValue = useContext(likeStatusContext);
  const notificationStatus = useContext(notificationsEnabledContext);
  // const [bookmarkStatus, setBookmarkStatus] = useState(post.bookmark?post.bookmark:'false');



  // const changePostStatus = () => {
  //   if (postStatus)
  //     setPostStatus('false')
  //   else
  //   setPostStatus('true')
  // }
 


  useEffect(() => {

    fetch('https://twitter-clone-0b2e.onrender.com/post')
      .then(res => res.json())
      .then(async (data) => {
         setPosts(data);
         console.log(data)
      })
    
  }, [postValue.postStatus,bookmarkValue.bookmarkStatus,likeValue.likeStatus,value.profileImage]);


  useEffect(() => {
    if (posts && posts.length > 0) {

      if (!posts[posts.length - 1].notified) {

        if (notificationStatus.notificationsEnabled && tweetContainsKeywords(posts[posts.length - 1])) {
          showNotification(posts[posts.length - 1]);
      
          const postProfile = {
            notified: true
          }

          const post_id = posts[posts.length - 1]._id
      
          axios.patch(`https://twitter-clone-0b2e.onrender.com/uniquePostUpdate/${post_id}`, postProfile)
            .then(res => console.log(res))
        }
      }
    }

  }, [posts,notificationStatus.notificationsEnabled]);


  const tweetContainsKeywords = (tweet) => {
    if (tweet) {
      const lowerCaseTweet = tweet.post.toLowerCase();
      return lowerCaseTweet.includes('cricket') && lowerCaseTweet.includes('science');
    }
    else
      return false;
  };

  const showNotification = (tweet) => {
      if (Notification.permission === 'granted') {
          new Notification('New Tweet Notification', {
              body: tweet.post,
              icon: tweet.image // You can add a custom icon for the notification
          });
      } else {
          console.log('Notification permission is not granted.');
      }
  };
  // const toggleBookmarkStatus = () => {
  //   if (bookmarkStatus)
  //     setBookmarkStatus(false);
  //   else
  //   setBookmarkStatus(true);
  // }
  
  return (
    <>
      {/* <bookmarkStatusContext.Provider value={{bookmarkStatus,setBookmarkStatus,toggleBookmarkStatus}}> */}
    
        <div className='feed-page'>
          <h3>Home</h3>
          <Tweet_box  />
          {
            posts.slice().reverse().map(post => {
                console.log(post)
              return <UserPost key={post._id} post={post} setPosts={setPosts}  />
            })
          }
          
        </div>
        {/* </bookmarkStatusContext.Provider> */}

    </>
  )
}

export default Feed
