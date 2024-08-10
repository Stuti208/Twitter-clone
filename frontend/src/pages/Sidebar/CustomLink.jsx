import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './Sidebar.css'

const CustomLink = ({ children, to,...props }) => {
    
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname,end:true });
    
  return (
    <div>
      <Link className='highlighted-link'
        style={{
          color:match?'rgb(56, 189, 241)':'black',
          backgroundColor: match ? 'rgb(153, 214, 238)' : 'white',
        }}
        to={to}
        {...props}
      >
              {children}
      </Link>
      </div> 
  )
}

export default CustomLink
