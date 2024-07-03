import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home1";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import ProtectdRouter from "./pages/ProtectdRouter";
import PageLoading from "./pages/PageLoading";
import Bookmarks from "./pages/Bookmark/Bookmarks";
import Messages from "./pages/Messages/Messages";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import More from "./pages/More/More";
import Feed from "./pages/sidebar/Feed/Feed";
import Explore from "./pages/Explore/Explore";
import Notifications from "./pages/Notifications/Notifications";
import Sidebar from "./pages/sidebar/Sidebar";
import Audio from "./pages/Audio/Audio";
import Location from "./pages/location/Location";
import ChatBot from "./pages/chatbot/ChatBot";
import LanguageSelection from "./pages/sidebar/Feed/LanguageSelection";
import OTPVerification from "./pages/sidebar/Feed/OTPVerification ";
import Forgetpass from './pages/Login/Forgetpass';

function App() {
  const [language, setLanguage] = useState('');
  const [otp, setOtp] = useState('');

  const handleSelectLanguage = (selectedLanguage, generatedOTP) => {
    setLanguage(selectedLanguage);
    setOtp(generatedOTP);
 };

 const user = { email: 'user@example.com', displayName: 'UserName1' };

 const handleLogout = () => {
     console.log('Logging out...');
 };


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
         <Sidebar handleLogout={handleLogout} user={user} />;

          <Home />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <Sidebar />
          <ProtectdRouter>
            <Home />
          </ProtectdRouter>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Home />
          <Signup />
        </>
      ),
    },
    {
      path: "/forgetpass",
      element: (
        <>
          <Forgetpass />
        </>
      ),
    },
    {
      path: "/page-loading",
      element: (
        <>
          <PageLoading />
        </>
      ),
    },
    {
      path: "/Feed",
      element: (
        <>
          <Sidebar />
          <Home />
          <Feed />
        </>
      ),
    },
    {
      path: "/languageselection",
      element: (
        <>
          <Sidebar />
          <Home />
          <LanguageSelection onSelectLanguage={handleSelectLanguage} />
        </>
      ),
    },
    {
      path: "/OTPVerification",
      element: (
        <>
        <OTPVerification language={language} otp={otp} />

        </>
      ),
    },
    {
      path: "/Explore",
      element: (
        <>
          <Sidebar />
          <Home />
          <Explore />
        </>
      ),
    },
    {
      path: "/Notifications",
      element: (
        <>
          <Sidebar />
          <Home />
          <Notifications />
        </>
      ),
    },
    {
      path: "/Bookmarks",
      element: (
        <>
          <Sidebar />
          <Home />
          <Bookmarks />
        </>
      ),
    },
    {
      path: "/Messages",
      element: (
        <>
          <Sidebar />
          <Home />
          <Messages />
        </>
      ),
    },
    {
      path: "/Lists",
      element: (
        <>
          <Sidebar />
          <Home />
          <Lists />
        </>
      ),
    },
    {
      path: "/Profile",
      element: (
        <>
          <Sidebar />
          <Home />
          <Profile />
          
        </>
      ),
    },
    {
      path: "/Audio",
      element: (
        <>
          <Sidebar />
          <Home />
          <Audio/>
        </>
      ),
    },
    {
      path: "/Location",
      element: (
        <>
          <Sidebar />
          <Home />
          <Location />
        </>
      ),
    },
    {
      path: "/ChatBot",
      element: (
        <>
          <Sidebar />
          <Home />
          <ChatBot />
        </>
      ),
    },
    {
      path: "/More",
      element: (
        <>
          <Sidebar />
          <Home />
          <More />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider index router={router} />
    </div>
  );
}

export default App;
