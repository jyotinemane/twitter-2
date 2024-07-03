import React, { useState } from 'react';
import iconT from "../../assets/images/photo-1596550190729-1d9225e788dd.avif";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import  {getUserInfo}  from './getUserInfo'; 
import Feed from '../sidebar/Feed/Feed';
import "./Login.css";
import '../../App.css';

export default function Login() {
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  // Function to check if the current time is between 10 AM and 1 PM
  const isWithinAllowedTime = () => {
    const currentTime = new Date();
    const start = new Date();
    start.setHours(10, 0, 0); // 10 AM
    const end = new Date();
    end.setHours(13, 0, 0); // 1 PM
    return currentTime >= start && currentTime <= end;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = await getUserInfo();

    // Implement conditional authentication based on user info
    if (userInfo.isMobile && !isWithinAllowedTime()) {
      alert('Mobile access is only allowed between 10 AM and 1 PM.');
      return;
    }

    signInWithEmailAndPassword(email1, password)
      .then(() => {
        // Save user info to the database
        saveUserInfo(userInfo);
        navigate('/Feed');
      });
  };

  const handleGoogleSignIn = async () => {
    const userInfo = await getUserInfo();

    // Implement conditional authentication based on user info
    if (userInfo.browser === 'chrome') {
      // Implement OTP logic here
    }

    signInWithGoogle()
      .then(() => {
        // Save user info to the database
        saveUserInfo(userInfo);
        navigate('/Feed');
      });
  };

  const saveUserInfo = (userInfo) => {
    // Save user info to your database
    // This is a placeholder, replace it with actual database save logic
    console.log('User info saved:', userInfo);
  };

  if (user || googleUser) {
    console.log(user);
    console.log(googleUser);
  }

  if (error) {
    console.log(error);
  }

  if (loading) {
    console.log("loading....");
  }

  return (
    <>
      <div className='login-container'>
        <div className="image-container" style={{ textAlign: "center", marginLeft: "40px" }}>
          <img className="ms-auto image"
            src={iconT} alt='' />
        </div>
        <div className="form-container" style={{ textAlign: "center" }}>
          <div className="form-box" style={{ marginTop: '-150px' }}>
            <i className="bi bi-twitter " style={{ fontSize: "50px", color: "skyblue" }}></i>
            <h2 className='heading'>Happening now</h2>
            <h3 className="heading1">What's happening today</h3>
            <form onSubmit={handleSubmit}>
              <input type="email"
                className='email'
                placeholder='Email address'
                onChange={(e) => setEmail1(e.target.value)}
              />

              <input
                type="password"
                className='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-login">
                <button type='submit' style={{ backgroundColor: 'rgb(92, 199, 243)' }} className='btn'>Login</button>
              </div>
            </form>
          </div>
          <hr />
          <div className="google-button ">
            <GoogleButton className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Don't have an account?
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "skyblue",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
