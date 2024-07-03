import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import useLoggedInUser from '../../../Hooks/LoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './Tweet.css';
import { MdVerified } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { IoMdRepeat } from "react-icons/io";
import { MdPublish } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";

const TweetBox = () => {
    const [post1, setPost1] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name1, setName1] = useState('');
    const [username1, setUserName1] = useState('');
    const [profilePhoto1, setProfilePhoto1] = useState('');
    const [loggedInUser] = useLoggedInUser('');
    const [user] = useAuthState(auth);
    const email1 = user?.email;
    

    const userProfilePic = loggedInUser[0]?.profileImage || "/broken-image.jpg";

    const handleUploadImage = (e) => {
        setIsLoading(true);
        const image = e.target.files[0];

        const formData = new FormData();
        formData.set('image', image);

        axios.post('https://api.imgbb.com/1/upload?key=2011dd90a734346cb2db03f9e9b538c9', formData)
            .then((res) => {
                const url = res.data.data.display_url;
        setImageURI(url);
        setIsLoading(false);
        localStorage.setItem("image", url); 
      });
            // .catch((error) => {
            //     console.log(error);
            //     setIsLoading(false);
            // });
    };

    const handleTweet = (e) => {
        e.preventDefault();

        if (user?.providerData[0]?.providerId === 'password') {
            fetch(`http://localhost:3000/loggedInUser?email=${email1}`)
                .then(res => res.json())
                .then(data => {
                    setName1(data[0]?.name1);
                    setUserName1(data[0]?.username1);
                });
        } else {
            setName1(user?.name1);
            setUserName1(email1?.split('@')[0]);
        }

        const userPost = {
            profilePhoto: userProfilePic,
            username: username1,
            name: name1,
            post: post1,
            photo: imageURI,
            email: email1
        };
        localStorage.setItem('tweetData', JSON.stringify(userPost));

        axios.post('http://localhost:3000/tweets')
      .then(() => {
        setPost1('');
        setImageURI('');
      });
  };

    localStorage.setItem("image", imageURI)
    return (
        <>
        <div className='tweetBox' style={{ marginRight: '0%',marginTop:'-45px', boxShadow: '1px 1px 1px 1px', padding: '10px' }}>
            <form onSubmit={handleTweet}>
                <div className="tweetBox_input d-flex">
                    <Avatar src={loggedInUser[0]?.profileImage || "/broken-image.jpg"} className='bg-info' style={{ marginLeft: '15px' }} />
                    <input
                        className='ms-3 form-control'
                        type='text'
                        placeholder="What's happening ?"
                        onChange={(e) => setPost1(e.target.value)}
                        value={post1}
                        required
                    />
                </div>

                <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className='imageIcon mt-3 ms-5 text-info '>
                
                        
                        <AddPhotoAlternateIcon />
                    </label>

                    <input
                        type='file'
                        id='image'
                        className='Input  mt-4'
                        onChange={handleUploadImage}
                        
                    />
                    <Button className='tweetBox_tweetButton mt-2 bg-info' style={{ marginLeft: '85%' }} type='submit'>Tweet</Button>
                </div>
            </form>
            </div>


            <div className='post' style={{marginLeft: '-0px', marginTop: '20px'}}>
        
        <div className='post_avatar'>
            <Avatar src={profilePhoto1}/>
        </div>
        <div className="post_body">
            <div className="post_header"style={{backgroundColor:'#1c1c46',color:'#fff'}}>
                <div className="post_headerText" >
                    <h3>
                        {name1}{"  "}
                        <span className='post_headerSpecial'>
                        <MdVerified className='post_badge'/>@{username1}
                        </span>
                    </h3>
                </div>
                <div className="post_headerDescription">
                    <p style={{fontSize: '15px'}}>{post1}</p>
                </div>
                <div>
                {/* <img src={image} alt='' width='400'/> */}
                {imageURI && <img src={imageURI} alt="Uploaded" width='445' height='350'/>}
                 <div className="post_footer">
                 <MdChatBubbleOutline className='post_footer_icon' fontSize='small' gap='2%'/>
                 <IoMdRepeat className='post_footer_icon' fontSize='small' gap='2%'/>
                 <MdPublish className='post_footer_icon' fontSize='small'/>
                 <GrFavorite className='post_footer_icon' fontSize='small'/>
                 </div>
                 </div>
            </div>
        </div>
    </div>
    {/* {imageURI && <img src={imageURI} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />} */}
        </>
    );
};

export default TweetBox;
