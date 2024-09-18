
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

// screens
import Home from './screens/Home.jsx'
import Signup from './screens/Signup.jsx'
import Login from './screens/Login.jsx'
import Profile from './screens/Profile.jsx'
import Update from './screens/Update.jsx'
import Create from './screens/Create.jsx'
import Post from './screens/Post.jsx'

const router =  createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route index={true} path="/" element={<Home/>}/>

        {/* User */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/profile/:userId/update" element={<Update/>}/>
        <Route path="/create" element={<Create/>}/>
        {/* Posts */}
        <Route path="/post/:id" element={<Post/>}/>
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
