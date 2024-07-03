import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import './Feed.css';
import axios from "axios";
import Post from './Post/Post'
import Widgets from "../../Widgets/Widgets";
import Sidebar from "../Sidebar";
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import auth from "../../../firebase.init";
import MainPage from "../../Profile/MainPage/MainPage";
import LanguageSelection from "./LanguageSelection";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [imageUrl,setImageUrl]=useState()
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetch("http://localhost:3000/post")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
    // const {data} = axios.get('http://locahost:3000/post')
    // console.log(data)
  }, [posts]);

   useEffect(() => {
    axios.get(`http://localhost:3000/post?lang=${language}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [language]);


  const user = useAuthState(auth);
 

  const handleLogout = () =>{
    signOut(user);
  }
  const handleimage=(image)=>{
    console.log(image,'000000000');
    setImageUrl(image)
  }
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (

    <div className="row">
      <div className="col-sm-2">
        <div className="">
          <div className="card-body">
          <Sidebar handleLogout={handleLogout} user={user}/>
           </div>
        </div>
       
      </div>
      <div className="col-sm-6">
      <div className='card'>
        <h2>Home</h2>
        <LanguageSelection onLanguageChange={handleLanguageChange} />
        </div>
        <div className="mt-5" style={{marginLeft: '43px'}}>
          <div className="card-body">
            <TweetBox/>
            {
              posts.map(p=> <TweetBox key={p?._id} p={p}/>)
            
            }
            {/* <Profile/> */}
           </div>
        </div>
        
       
      </div>
      
      <div className="col-sm-4">
        <div className="">
          <div className="card-body">
          <Widgets/>
           </div>
        </div>

      </div>
    </div>
    
  );
};

export default Feed;
