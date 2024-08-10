import React, { useState,useContext,useEffect } from 'react'
import './Sidebar.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity'; import MoreIcon from '@mui/icons-material/More';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { CustomLink } from 'react-router-dom';
import CustomLink from './CustomLink.jsx'
import { profileImageContext,loggedInUserContext } from '../../Context/Context';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleLogOut}) => {
  
  // const user = useAuthState(auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const value = useContext(profileImageContext)
  const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useLoggedInUser({});
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;

  useEffect(() => {

    if (user) {
        const email = user[0].email;

        fetch(`http://localhost:3000/loggedInUser?email=${email}`)
         .then(res => res.json())
         .then(data => {
                userValue.setLoggedInUser(data[0]);
          })
    }
  }, [value.profileImage]);


  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className='sidebar'>
      <TwitterIcon
        className='Twitter-icon'
        style={{ fontSize: '30px' }} />
      
       <CustomLink to='/home/feed'>
          <SidebarOptions active Icon={HomeIcon} text='Home'/>
      </CustomLink>
      
      <CustomLink to='/home/explore'>
        <SidebarOptions active Icon={SearchIcon} text='Explore' />
      </CustomLink>

      <CustomLink to='/home/notifications'>
        <SidebarOptions active Icon={NotificationsNoneIcon} text='Notifications'/>
      </CustomLink>

      <CustomLink to='/home/messages'>
        <SidebarOptions active Icon={MailOutlineIcon} text='Messages'/>
      </CustomLink>

      <CustomLink to='/home/bookmark'>
        <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks'/>
      </CustomLink>

      <CustomLink to='/home/communities'>
        <SidebarOptions active Icon={PeopleOutlineIcon} text='Communities'/>
      </CustomLink>

      <CustomLink to='/home/profile'>
        <SidebarOptions active Icon={PermIdentityIcon} text='Profile'/>
      </CustomLink>

      {/* <CustomLink to='/home/more'> */}
        <SidebarOptions active Icon={MoreIcon} text='More' />
      {/* </CustomLink> */}
      
      <button className='Tweet-btn'>Tweet</button>
      
      <div className="Profile-info">

        {
          loggedInUser.profileImage ?
            <img src={loggedInUser.profileImage} className='sidebar-profileimage'/>:
            <Avatar style={{scale:'1.1'}}></Avatar>
        }
        
         <div className="user-info">
          <h4>{ loggedInUser.name}</h4>
          <h5>{ `@${loggedInUser.username}`}</h5>
        </div>
        
        <IconButton
          className='profile-more'
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>

        <Menu className='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose} >
          <MenuItem className='profile_info1' 
            onClick={()=>navigate('/')}>
            Add an existing account
          </MenuItem>

          {/* <Divider/> */}

          <MenuItem
            className='profile_info2'
            onClick={handleLogOut}>
            Log out @{loggedInUser.username}
          </MenuItem>

        </Menu>

      </div>
    </div>
  )
}

export default Sidebar
