import React, {useState} from 'react'
import './sidebar.css';
import SidebarOptions from './SidebarOptions';
import Home1 from '../Home1';
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import MicOffIcon from '@mui/icons-material/MicOff';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Avatar, Button, IconButton, Menu, MenuItem, ListItemIcon, Divider} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import LoggedInUser from '../../Hooks/LoggedInUser';

const Sidebar = (handleLogout, user) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [loggedInUser] = LoggedInUser( );
    const navigate = useNavigate();
console.log(user,'user');
    const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage: "/broken-image.jpg";

    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
        console.log(event,'file');
    }
    const handleClose = ()=>{
        setAnchorEl(null);
    }
    const handleClick1 = (event)=>{
        setAnchorEl(event.currentTarget);
        console.log(event,'file');
        navigate('/Login');
    }

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/Login');
    };


    const result = user?.email1?.split('@')[0];
    
  return (
    
    <div className='sidebar ' style={{marginRigth: '30px'}}>
     <TwitterIcon className='sidebar_twitterIcon'/>
     
     <Link to='/feed'>
     <SidebarOptions active Icon={HomeIcon} text='Home'/>
     </Link>
     <Link to='/Explore'>
     <SidebarOptions active Icon={SearchIcon }text='Explore'/>
     </Link>
     <Link to='/Notifications'>
     <SidebarOptions active Icon={NotificationsIcon}  text='Notifications'/>
     </Link>
     <Link to='/Messages'>
     <SidebarOptions active Icon={MailOutlineIcon} text='Messages'/>
     </Link>
     <Link to='/Bookmarks'>
     <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks'/>
     </Link>
     <Link to='/Profile'>
     <SidebarOptions active Icon={PermIdentityIcon} text='Profile'/>
     </Link>
     <Link to='/Audio'>
     <SidebarOptions active Icon={MicOffIcon} text='Audio'/>
     </Link>
     <Link to='/Location'>
     <SidebarOptions active Icon={LocationSearchingIcon} text='Location'/>
     </Link>
     <Link to='/ChatBot'>
     <SidebarOptions active Icon={ChatBubbleOutlineIcon} text='ChatBot'/>
     </Link>
     <Link to='/Lists'>
     <SidebarOptions active Icon={ListAltIcon} text='Lists'/>
     </Link>
     <Link to='/More'>
     <SidebarOptions active Icon={MoreVertIcon} text='More'/>
     </Link>
     {/* <SidebarOptions active Icon={<i class="bi bi-list-task"></i>} text=''/> */}

     <Button variant='outlined'onClick={handleClick}  className='sidebar_tweet'>
       Tweet
     </Button>
     <Button variant='outlined'onClick={handleClick1}  className='sidebar_tweet'>
       LogOut
     </Button>

     <div className="Profile_info">
        <Avatar src={userProfilePic}/>
        <div className="user_info">
            <h4>
                {
                    loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
                }
            </h4>
            <h5>@{result}</h5>
        </div>
        <IconButton       
        size='small'
        sx={{ml:2}}
        aria-controls={openMenu? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        >
        
        <MoreHorizIcon/>
        </IconButton>

        <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
            <MenuItem className='Profile_info1'>
              <Avatar src={userProfilePic}/>
        <div className="user_info subUser_info">
            <div>            
            <h4>
                {
                    loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
                }
            </h4>
            <h5>@{result}</h5>
            </div>
            <ListItemIcon className='done_icon'><DoneIcon />
            </ListItemIcon>
        </div>
            </MenuItem>
            <Divider/>
    
            <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
            <MenuItem onClick={handleLogout}>@{result}</MenuItem>
        </Menu>
     </div>
    </div>
  )
}

export default Sidebar;