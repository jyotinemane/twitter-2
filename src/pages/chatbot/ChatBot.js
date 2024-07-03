import React, { useEffect } from 'react';

const ChatBot = () => {
    useEffect(() => {
        window.__be = window.__be || {};
        window.__be.id = "6673e87cf95a260007f0bbcb";
        (function () {
            var be = document.createElement('script');
            be.type = 'text/javascript';
            be.async = true;
            be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(be, s);
        })();
    }, []); 

    return (
        <div>
            <img style={{marginLeft: '15rem',position: 'absolute',width: '1000px',height: '600px'}}src='https://plus.unsplash.com/premium_photo-1677094310970-d0d11baeaa68?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhdCUyMGdwdHxlbnwwfHwwfHx8MA%3D%3D' alt='chatbot'/>
            <noscript>
                You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a>.
            </noscript>
        </div>
    );
};

export default ChatBot;
