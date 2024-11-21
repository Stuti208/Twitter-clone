import { Link } from 'react-router-dom'
import React from 'react'
import '../App.css';

const Success = () => {
  return (
    <div className="success-container">
        <div className="success-page">
          <h1>Payment Successful!</h1><br/>
          <p>Thank you for subscribing to our plan. Your payment was successfully processed.</p>
          <p>
            A confirmation email has been sent to your registered email address.
        </p>
        <br/>
          
          <Link to="/home/feed" className="back-home-btn">
            Go Back to Homepage
          </Link>
          </div>
      </div>
  )
}

export default Success
