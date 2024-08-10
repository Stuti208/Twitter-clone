import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Widgets.css'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const Widgets = () => {

  const [search, setSearch] = useState('');

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

      <div className="widgets-content">
         <TwitterTweetEmbed
           tweetId={'1557187138352861186'}
         />
        
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{height: 400}}
        />
{/* 
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="narendramodi"
          options={{ height: 400, marginTop:'25px' }}
        /> */}


      </div>

    </div>
  )
}

export default Widgets
