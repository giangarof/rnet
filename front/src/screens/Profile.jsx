import React, {useEffect, useState } from 'react'

import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent, Container} from '@mui/material';

import NotificationSuccess from '../components/errors/NotificationSuccess.jsx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import ProfileUser from '../components/ProfileUser.jsx';

function Profile(){
    const [userId, setUserId] = useState()

    const location = useLocation();
    const messageSuccess = location.state?.message

    // useEffect(() => {
    //     const profile = async () => {
    //         const user = await axios.get(`/api/user${location.pathname}`)
    //         setUserId(user.data.user._id)
    //         console.log(user)
    //     }
    //     profile()

    // })


    const container = {
        marginTop:'8rem',
        
    }
    
    return (
        <>
            <Container sx={container}>

                <ProfileUser/>
                
                <NotificationSuccess message={messageSuccess}/>
            </Container>
        </>
    )
}

export default Profile;