import React from 'react'
import '../Feed_Page.css'
import './Notifications.css'

const Notifications = () => {
  return (
    <div className='feed-page'>
       <div className="notification-header">
          <h2>Notifications</h2>
      </div>
      
      <div className="notification-content">
            <h1>Nothing to see here <br/>— yet</h1>
            <p>From likes to reposts and a whole lot more, this<br/>is where all the action happens.</p>
      </div>

    </div>
  )
}

export default Notifications;
