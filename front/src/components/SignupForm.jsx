import {useState, useEffect} from 'react';
import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Error_Credentials from './errors/NotificationError.jsx';
import NotificationError from './errors/NotificationError.jsx';

const SignupForm = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    
    const credentials = {name, username, email, password};
    const navigate = useNavigate('')

    const signup = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        try {
            const user = await axios.post('/api/user/signup', credentials)
            if(user.status === 201){
                // console.log(user)
                setErrorMsg(user.data?.message || `Try again later.`)
                navigate('/login', { state: { message: user.data?.message || 'Signup successful' } });
                // return user;
            } 
        } catch (error) {
            setErrorMsg(error.response.data)
            // console.error(error.response?.data?.message || 'An error occurred');
            console.log(error.response.data)
        }
    }

    const form = {
        display:'flex',
        flexDirection:'column',
        gap:'2rem'
    }

    return (
        <>
            <Box
                component="form"
                sx={form}
                noValidate
                autoComplete="off"
                >
                <Typography variant='h4'>Signup</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                <Button variant='contained' onClick={signup}>Register</Button>
                <Typography>
                    Do you have an account already?
                    <Link  sx={{ml:"1rem"}} href="/login">Login</Link>
                </Typography>

                <NotificationError message={errorMsg} />
            </Box>
        </>
    )
}

export default SignupForm;