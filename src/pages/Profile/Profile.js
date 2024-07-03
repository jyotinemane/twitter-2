import React from 'react'
import '../page.css'
import MainPage from './MainPage/MainPage'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import Widgets from '../Widgets/Widgets'

const Profile = () => {
  const [user] = useAuthState(auth)
  return (
   
    <div className='row profilePage'>
      <div className="col-sm-4 offset-sm-2">

        <MainPage/>
      </div>
      <div className="col-sm-4 offset-sm-2">

        <Widgets/>
      </div>
    </div>



    
  )
}

export default Profile