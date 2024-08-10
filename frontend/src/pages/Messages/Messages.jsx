import React from 'react'

const Messages = () => {
  return (
    <div className='feed-page'>
       <div className="notification-header">
          <h2>Messages</h2>
      </div>
      
      <div className="notification-content">
            <h1>Welcome to your<br/>inbox!</h1>
            <p>Drop a line, share posts and more with private<br/>conversations between you and others on Twitter. </p>
      </div>

      <div className="login-btn">
            <button type='submit' className='msg-btn'>Write a message</button>
      </div>

    </div>
  )
}

export default Messages
