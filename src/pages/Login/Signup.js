import React, { useState } from "react";
import iconT from "../../assets/images/photo-1596550190729-1d9225e788dd.avif";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Feed from '../sidebar/Feed/Feed';
import axios from "axios";
import Forgetpass from "./Forgetpass";

export default function Signup() {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [username1, setUserName1] = useState("");
  const [showForgetPass, setShowForgetPass] = useState(false);
  const navigate = useNavigate();


  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
 
  if (user || googleUser) {
    navigate("./Feed")
    console.log(user)
    console.log(googleUser)
  }
  if (error) {
    console.log(error);
  }
  if (loading) {
    console.log("loading....");
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email1, password);
    createUserWithEmailAndPassword(email1, password);
  
    const user = {
    username: username1,
    name:name1,
    email:email1,
    password:password
  }

  const {data} = axios.post('http://localhost:5000/register', user)
  console.log(data)
};
  const handleGoogleSignIn = () => {
    signInWithGoogle();
   
  }
  const toggleForgetPass = () => {
    setShowForgetPass(!showForgetPass);
  };

  return (
    <div>
        <div className="login-container">
          <div className="image-container" style={{ textAlign: "center", marginLeft: "40px" }}>
            <img
              className="ms-auto image"
              src={iconT}
              alt=""
            />
          </div>
          <div className="form-container" style={{ textAlign: "center" }}>
            <div className="form-box">
            <i className="bi bi-twitter " style={{ fontSize: "50px", color: "skyblue" }}></i>
            <h2 className="heading">Happening now</h2>
            <h3 className="heading1">Join twitter today</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="display-name"
                placeholder="username"
                onChange={(e) => setUserName1(e.target.value)}
              />
              <input
                type="text"
                className="display-name"
                placeholder="Enter full name"
                onChange={(e) => setName1(e.target.valueAsNumber)}
              />
              <input
                type="email"
                className="email"
                placeholder="Email address"
                onChange={(e) => setEmail1(e.target.value)}
              />

              <input
                type="password"
                className="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" style={{backgroundColor: 'rgb(92, 199, 243)'}} className="btn">
                  Sign Up
                </button><br/>
                <Link to='/Forgetpass' style={{marginLeft: '13rem'}}>Forgot Password </Link>
              </div>
            </form>
          </div>
          <hr />
          <div className="google-button">
            <GoogleButton className="g-btn"
           type="light" 
           onClick={handleGoogleSignIn}
           />
          </div>
          <div style={{marginTop: "5px"}}>
           Already have an account?
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "skyblue",
                fontWeight: "600",
                marginRight: "4px",
                textAlign: "center"
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
     </div>
  );
}
