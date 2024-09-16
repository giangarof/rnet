import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent} from '@mui/material';

import NotificationError from './errors/NotificationError.jsx';
import NotificationSuccess from './errors/NotificationSuccess.jsx';

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const location = useLocation();
    const messageSuccess = location.state?.message

    const login = async() => { 
        setErrorMsg('')
      
        try {
            const credentials = {email,password};
            const user = await axios.post('/api/user/login', credentials)
                if(user.status === 200){
                    localStorage.setItem("userId", user.data.profile._id)
                    localStorage.setItem("name", user.data.profile.name)
                    navigate(`/profile/${user.data.profile._id}`, 
                        { state: { message: `${user.data?.message}, ${user.data?.profile?.name}` || 'Welcome back' } }
                    )
                    navigate(0)
                
                }
            
        } catch (error) {
            setErrorMsg(error.response.data)
        } 
    }

    const form = {
        display:'flex',
        flexDirection:'column',
        gap:'2rem',
    }

    useEffect(() => {
        login()
    },[])

    return (
        <>
            <Box
                component="form"
                sx={form}
                noValidate
                autoComplete="off"
                >
                <Typography variant='h4'>Login</Typography>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                <Button variant='contained' onClick={login}>Log in</Button>
                <Typography>
                    Are you a new user?
                    <Link sx={{ml:"1rem"}} href="/signup">Signup</Link>
                </Typography>

                <NotificationError message={errorMsg}/>
                <NotificationSuccess message={messageSuccess}/>
                
                
            </Box>
        </>
    )
}

export default LoginForm;