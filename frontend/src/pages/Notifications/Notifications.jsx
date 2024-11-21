import React from 'react'
import '../Feed_Page.css'
import './Notifications.css'
import { useTranslation } from 'react-i18next'

const Notifications = () => {

  const { t } = useTranslation();
  const { line1, line2, line3, line4 } = t("notification");

  return (
    <div className='feed-page'>
       <div className="notification-header">
          <h2>{ t("component3")}</h2>
      </div>
      
      <div className="notification-content">
           <h1>{line1}<br/>{line2}</h1>
            <p>{line3}<br/>{line4}</p>
      </div>

    </div>
  )
}

export default Notifications;
