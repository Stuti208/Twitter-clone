import React, { useState,useEffect, useContext } from 'react'
import './Feed.css'
import '../Feed_Page.css'
import Tweet_box from './Tweet_box/Tweet_box.jsx'
import UserPost from './UserPost/UserPost.jsx'
import { bookmarkStatusContext, likeStatusContext, postStatusContext, profileImageContext } from '../../Context/Context'

const Feed = () => {

  const [posts, setPosts] = useState([]);
  // const [postStatus, setPostStatus] = useState(false);
  const value = useContext(profileImageContext)
  const postValue = useContext(postStatusContext);
  const bookmarkValue = useContext(bookmarkStatusContext);
  const likeValue = useContext(likeStatusContext);
  // const [bookmarkStatus, setBookmarkStatus] = useState(post.bookmark?post.bookmark:'false');



  // const changePostStatus = () => {
  //   if (postStatus)
  //     setPostStatus('false')
  //   else
  //   setPostStatus('true')
  // }


  useEffect(() => {

    fetch('http://localhost:3000/post')
      .then(res => res.json())
      .then(async (data) => {
         setPosts(data);
         console.log(data)
      })
    
  }, [postValue.postStatus,bookmarkValue.bookmarkStatus,likeValue.likeStatus,value.profileImage]);


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
