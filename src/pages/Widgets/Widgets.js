import React from 'react'
import './Widgets.css';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { IoSearch } from "react-icons/io5";


const Widgets = () => {
  return (
    <div className="row">
      <div className=" ">
    <div className='widgets'>
      <div className="widgets_input">
      <IoSearch className='widgets_serachIcon'/>
      <input type='text' placeholder='SearchTwitter'/>
      </div>

      <div className="widgets_wedgetContainer">
        <h2>What's happening</h2>
      </div>
      <TwitterTweetEmbed
      tweetId={'1557187138352861186'}
/>

     <TwitterTimelineEmbed
     sourceType='prifile'
     screenName='elonmusk'
     options={{height: 400}}/>
    </div>
    </div>
    </div>
  )
}

export default Widgets