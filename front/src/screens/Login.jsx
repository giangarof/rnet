import React, {useState } from 'react'

import LoginForm from '../components/LoginForm.jsx';
import { Box, Container } from '@mui/material';

function Login(){

    const container = {
        marginTop:'8rem',
    }
    return (
        <>  
            <Container sx={container}>

                <LoginForm/>
            </Container>
        </>
    )
}

export default Login;