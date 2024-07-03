import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useLoggedInUser from "../../../Hooks/LoggedInUser";
import { MdCenterFocusWeak, MdMyLocation, MdAddLink, MdLockReset, MdOutlinePhotoCamera, MdVerified, MdChatBubbleOutline, MdPublish } from "react-icons/md";
import { IoMdRepeat } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import axios from "axios";
import { Avatar } from '@mui/material';
import EditProfile from '../EditProfile/EditProfile';

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [posts1, setPosts1] = useState('');
  const [name1, setName1] = useState('');
  const [username1, setUserName1] = useState('');
  const [profilePhoto1, setProfilePhoto1] = useState('');
  const email1 = user?.email;

  const [imageURI, setImageURI] = useState(localStorage.getItem("image") || "");
  const [loggedInUser] = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
  const [profileCov, setProfileCov] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/userPost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts1(data);
      });
  }, [user?.email]); 

  const username = user?.email?.split("@")[0];

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=2011dd90a734346cb2db03f9e9b538c9",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setImageURI(url);
        const userCoverImage = {
          email1: user?.email,
          coverImage: url,
        };
        setIsLoading(false);
        if (url) {
          axios.patch(`http://localhost:3000/userUpdate/${user?.email}`, userCoverImage);
        }
      });
  };

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=2011dd90a734346cb2db03f9e9b538c9",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setProfileCov(url);
        const userProfileImage = {
          email1: user?.email,
          profileImage: url,
        };
        setIsLoading(false);
        if (url) {
          axios.patch(`http://localhost:3000/userUpdate/${user?.email}`, userProfileImage);
        }
      });

    const userPost = {
      profilePhoto: loggedInUser[0]?.profileImage || "/broken-image.jpg",
      username: username1,
      name: name1,
      posts: posts1,
      photo: imageURI,
      email: email1,
    };

    localStorage.setItem('tweetData', JSON.stringify(userPost));
    setPosts1('');
    setImageURI('');
  };

  return (
    <div>
      <FaArrowLeft
        className="arrow-icon"
        onClick={() => {
          navigate("/");
        }}
      />
      <h4 className="heading-4">@{username1}</h4>
      <div className="mainProfile">
        <div className="profile_bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={imageURI || <MdOutlinePhotoCamera />}
                alt=""
                className="coverImage"
              />
              <div className="hoverCoverImage ">
                <label htmlFor="image" className="imageIcon" style={{ marginLeft: "20rem" }}>
                  {isLoading ? (
                    <MdLockReset className="photoIcon photoIconDisabled " />
                  ) : (
                    <MdCenterFocusWeak className="photoIcon" />
                  )}
                </label>
                <div className="imageIcon_tweetButton">
                  <input
                    type="file"
                    id="image"
                    className="Input"
                    onChange={handleUploadCoverImage}
                  />
                </div>
              </div>
            </div>
            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    profileCov
                      ? profileCov
                      : "https//cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt=""
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isLoading ? (
                        <MdLockReset className="photoIcon photoIconDisabled" />
                      ) : (
                        <MdCenterFocusWeak className="photoIcon" />
                      )}
                    </label>
                    <div className="imageIcon_tweetButton">
                      <input
                        type="file"
                        id="profileImage"
                        className="Input"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name1 ? loggedInUser[0]?.name1 : user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username1}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser}/>
                  <div className="infoContainer">
                    {loggedInUser[0]?.bio || ""}
                    <div className="locatonAndLink">
                      {loggedInUser[0]?.location && (
                        <p className="subinfo">
                          <MdMyLocation />
                          {loggedInUser[0]?.location}
                        </p>
                      )}
                      {loggedInUser[0]?.website && (
                        <p className="subinfo">
                          <MdAddLink />
                          {loggedInUser[0]?.website}
                        </p>
                      )}
                    </div>
                  </div>
                  <h4 className="tweetsText" style={{ marginLeft: "-31rem" }}>Tweets</h4>
                </div>
                <hr />
                <div className='post' style={{ marginLeft: '-0px', marginTop: '20px', paddingRight: '36rem' }}>
                  <div className='post_avatar'>
                    <Avatar src={profilePhoto1} />
                  </div>
                  <div className="post_body">
                    <div className="post_header">
                      <div className="post_headerText">
                        <h3 style={{ paddingRight: '30rem', marginLeft: '20px' }}>
                          {name1}{"  "}
                          <span className='post_headerSpecial'>
                            <MdVerified className='post_badge' />@{username1}
                          </span>
                        </h3>
                      </div>
                      <div className="post_headerDescription">
                        <p style={{ fontSize: '10px' }}>{posts1}</p>
                      </div>
                      <div>
                        {imageURI && <img src={imageURI} alt="Uploaded" marginLeft="70px" width='450' height='350' />}
                        <div className="post_footer">
                          <MdChatBubbleOutline className='post_footer_icon' fontSize='small' />
                          <IoMdRepeat className='post_footer_icon' fontSize='small' />
                          <MdPublish className='post_footer_icon' fontSize='small' />
                          <GrFavorite className='post_footer_icon' fontSize='small' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
