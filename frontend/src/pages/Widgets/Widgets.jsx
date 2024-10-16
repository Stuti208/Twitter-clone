import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Widgets.css'
import { TwitterTimelineEmbed,TwitterTweetEmbed } from 'react-twitter-embed';
import FollowProfile from './FollowProfile';
import useLoggedInUser from '../../hooks/useLoggedInUser';

const Widgets = () => {

  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState('');
  const [loggedInUser, setLoggedInUser] = useLoggedInUser({});

  useEffect(() => {

    fetch('https://twitter-clone-0b2e.onrender.com/userdata')
      .then(res => res.json())
      .then(async (data) => {
         setUserData(data);
        // console.log(data)
        console.log(loggedInUser)
      })
    
  }, []);

  return (
    <div className='widgets'>

      <div className="widgets-searchbar">
        <SearchIcon style={{
          color: 'grey', marginLeft: '20px', scale: '1.2',
          position:'relative',top:'0px',left:'40px'}} />
        <input
          type='text'
          placeholder='Search Twitter'
          value={search}
          onChange={e=> setSearch(e.target.value)} />
      </div>

      
      <div className="widgets-heading">
          <h2>What's happening</h2>
      </div>

      {
        userData && userData.map(data => {
          // console.log(data)
          if(data.email!==loggedInUser.email)
             return <FollowProfile key={data._id} data={data}  />
        })
     }

      {/* <div className="widgets-content">
         <TwitterTweetEmbed
           tweetId={'1557187138352861186'}
         />
        
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{height: 400}}
        /> */}
{/* 
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="narendramodi"
          options={{ height: 400, marginTop:'25px' }}
        /> */}


      {/* </div> */}

    </div>
  )
}

export default Widgets
