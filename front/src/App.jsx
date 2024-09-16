import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'


function App() {
  const [user, setUser] = React.useState(false)
  const [imgProfile, setImgProfile] = React.useState('')

  React.useEffect(() => {
    fetch(`/api/user/auth`)
    .then(res => res.json())
    .then(data => {
      if(data.user){
        setUser(data.user.name)
        setImgProfile(data.user.profileImage[0].url)
      }
    })
    .catch((err) => console.log(err))
  },[])

  return (
    <>
      <React.Fragment>
          <Navbar isUser={user} imgProfile={imgProfile}/>
          <Outlet/>
      </React.Fragment>
    </>
  )
}

export default App
