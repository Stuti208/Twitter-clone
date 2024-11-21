import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


const Cancel = () => {
  return (
    <div className='cancel-container'>
      <div className="cancel-page">
      <h1>Payment Cancelled</h1><br/>
      <p>
        It seems you cancelled your payment process. If this was an error, you can try again by choosing a subscription plan.
        </p>
        
      <Link to="/home/settings" className="retry-payment-btn">
        View Subscription Plans
        </Link>
        <br/>
      <Link to="/home" className="back-home-btn">
        Go Back to Homepage
      </Link>
    </div>
    </div>
  )
}

export default Cancel
