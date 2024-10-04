import React, {useState } from 'react'
import {Box, Container, Typography, Link} from '@mui/material'

function Home(){
    const id = localStorage.getItem('userId')

    const container = {
        marginTop:'7rem'
    }

    const out = {
        marginTop:'4rem'
    }

    const box1 = {
        display:'flex', gap:'5rem'
    }
    return (
        <>
            <Container sx={container}>
                <Typography>Rnet fullstack project</Typography>
                <Typography>React.js, MongoDB, Material UI.</Typography>

                <Box sx={out}>

                    <Typography>What you can do;</Typography>
                    <Box sx={box1}>
                        <Link href='/home'>
                            <Typography>See all posts</Typography>
                        </Link>

                        {id ? <>
                            <Link href={`/profile/${id}`}>
                                <Typography>Your Profile</Typography>
                            </Link>
                        
                        </> : <>
                            <Link href={`/login`}>
                                <Typography>Login</Typography>  
                            </Link>
                            <Link href={`/signup`}> 
                                <Typography>Signup</Typography>
                            </Link>
                        </>}
                    </Box>
                </Box>
            </Container>
            
            
        </>
    )
}

export default Home;