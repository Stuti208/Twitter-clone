import React from 'react'
import '../Feed_Page.css'
import './Explore.css'

const Explore = () => {
  return (
    <div className='feed-page'>
       <div className="explore-header">
          <h2>Explore</h2>
      </div>

      <div className="explore-content">
        <h2>Trends for you</h2>
        
        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#IndiaAtOlympics</h4>
            <p className='tweet-num'>4,371 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#UPSC</h4>
            <p className='tweet-num'>1,535 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#DelhiRains</h4>
            <p className='tweet-num'>2,151 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#NEETPG</h4>
            <p className='tweet-num'>1,538 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#Boxing</h4>
            <p className='tweet-num'>10.7K posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Events · Trending</p>
            <h4>Deepika Kumari</h4>
            <p className='tweet-num'>1,371 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Sports · Trending</p>
            <h4>#DurandCup2024</h4>
            <p className='tweet-num'>2,039 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in India</p>
            <h4>#PujaKhedkar</h4>
            <p className='tweet-num'>4,027 posts</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>Trending in Business & finance</p>
            <h4>Lincoln Financial Field</h4>
            <p className='tweet-num'>1,590 posts</p>
        </div>


      </div>
    </div>
  )
}

export default Explore;
