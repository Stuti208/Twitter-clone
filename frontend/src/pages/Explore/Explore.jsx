import React from 'react'
import '../Feed_Page.css'
import './Explore.css'
import { useTranslation } from 'react-i18next';

const Explore = () => {

  const { t } = useTranslation();

  return (
    <div className='feed-page'>
       <div className="explore-header">
          <h2>{ t("component2")}</h2>
      </div>

      <div className="explore-content">
        <h2>{ t("trends")}</h2>
        
        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#IndiaAtOlympics</h4>
            <p className='tweet-num'>4,371 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#UPSC</h4>
            <p className='tweet-num'>1,535 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#DelhiRains</h4>
            <p className='tweet-num'>2,151 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#NEETPG</h4>
            <p className='tweet-num'>1,538 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#Boxing</h4>
            <p className='tweet-num'>10.7K { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("entertainment")} · { t("trending")}</p>
            <h4>Deepika Kumari</h4>
            <p className='tweet-num'>1,371 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("sports")} · { t("trending")}</p>
            <h4>#DurandCup2024</h4>
            <p className='tweet-num'>2,039 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingI")}</p>
            <h4>#PujaKhedkar</h4>
            <p className='tweet-num'>4,027 { t("posts")}</p>
        </div>

        <div className="trend-news">
            <p className='trending-place'>{ t("trendingB")}</p>
            <h4>Lincoln Financial Field</h4>
            <p className='tweet-num'>1,590 { t("posts")}</p>
        </div>


      </div>
    </div>
  )
}

export default Explore;
