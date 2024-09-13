import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
      <React.Fragment>
          <Navbar/>
          <Outlet/>
      </React.Fragment>
    </>
  )
}

export default App
