import React from 'react'
import '../Feed_Page.css'
import './Communities.css'
import { useTranslation } from 'react-i18next';

const Communities = () => {
  const { t } = useTranslation();

  return (
    <div className='feed-page'>
       <div className="communities-header">
          <h2>{ t("component6")}</h2>
      </div>

      <div className="notification-content">
            <h1>No Communities yet--</h1>
      </div>
    </div>
  )
}

export default Communities
