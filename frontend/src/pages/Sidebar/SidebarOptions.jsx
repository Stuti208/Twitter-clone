import React from 'react'
import './SidebarOptions.css'

const SidebarOptions = ({active,Icon,text}) => {
  return (
      <div className={`sidebarOptions ${active && 'sidebarOptions_active'}`}>
          <Icon />
          <h3 className='sidebar-text'>{text}</h3>
    </div>
  )
}

export default SidebarOptions
