import React from 'react'
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();
  const { line1, line2, line3, line4 } = t("messages");

  return (
    <div className='feed-page'>
       <div className="notification-header">
          <h2>{ t("component4")}</h2>
      </div>
      
      <div className="notification-content">
        <h1>{ line1}<br/>{ line2}</h1>
            <p>{ line3}<br/>{ line4} </p>
      </div>

      <div className="login-btn">
        <button type='submit' className='msg-btn'>{ t('msg-btn')}</button>
      </div>

    </div>
  )
}

export default Messages
