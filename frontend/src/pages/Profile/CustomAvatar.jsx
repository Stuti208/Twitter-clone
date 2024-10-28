import { Button, IconButton } from '@mui/material'
import React from 'react'

const CustomAvatar = ({ setAvatarURL, source }) => {
  
  const handleURL = () => {
    setAvatarURL(source);
  }

  return (
      <div className='avatar'
          style={{ height:'60px', width:'60px', borderRadius:'50%',margin:'10px'}}>

      <IconButton onClick={handleURL}>
        <img src={source} className='avatar-img'
          style={{ height: '60px', width: '60px', borderRadius: '50%',border:'1px solid rgb(122, 113, 113)'}}>
        </img>
        </IconButton>
    </div>
  )
}

export default CustomAvatar
