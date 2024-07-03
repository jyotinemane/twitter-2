import { Avatar } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { MdVerified } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { IoMdRepeat } from "react-icons/io";
import { MdPublish } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import './Post.css';
import TweetBox from '../TweetBox';

const Post = ( P,{data} ,image ) => {
    const { name, username, photo, post, profilePhoto } = P;
    const [imgD,setImgD]=useState()
console.log(data,'0000000000000000');
    console.log(image,'kkk');
    
    


// console.log(localStorage.getItem("image"));
    
  return (
   
    <div className='post'>
        
        <div className='post_avatar'>
            <Avatar src={profilePhoto}/>
        </div>
        <div className="post_body">
            <div className="post_header">
                <div className="post_headerText">
                    <h3>
                        {name}{"  "}
                        <span className='post_headerSpecial'>
                        <MdVerified className='post_badge'/>@{username}
                        </span>
                    </h3>
                </div>
                <div className="post_headerDescription">
                    <p>{post}</p>
                </div>
                {/* <img src={image} alt='' width='400'/> */}
                {imgD && <img src={imgD} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                 <div className="post_footer">
                 <MdChatBubbleOutline className='post_footer_icon' fontSize='small' gap='2%'/>
                 <IoMdRepeat className='post_footer_icon' fontSize='small' gap='2%'/>
                 <MdPublish className='post_footer_icon' fontSize='small'/>
                 <GrFavorite className='post_footer_icon' fontSize='small'/>

                 </div>
            </div>
        </div>
        {/* <h1>this is post</h1> */}
    </div>
      )
}

export default Post