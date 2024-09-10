import React, {useState } from 'react'

import SignupForm from '../components/SignupForm.jsx';
import { Container } from '@mui/material';

function Signup(){
    const container = {
        marginTop:'8rem',
    }
    return (
        <>
            <Container sx={container}>
                <SignupForm/>   
            </Container>
            
        </>
    )
}

export default Signup;