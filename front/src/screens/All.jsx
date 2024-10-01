import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent, Container, Card, CardMedia} from '@mui/material';

const All = () => {
    const [post, setPost] = useState([])
    const fetching = async() => {
        const res = await axios.get(`/api/post/`)
        const data =  res.data.posts
        setPost(data)
        console.log(data)

        // data.map(i => {
        //     setPost(i)
        //     console.log(i)
        // })
    }

    useEffect(() => {
        fetching()
    }, [])

    const form = {
        marginTop:'7rem'
    }

    const box ={
        display:'flex', flexDirection:'column',
        gap:'10px', marginBottom:'15px', padding:'1rem',
        backgroundColor:'rgba(0,0,0,0.1)'
    }

    const link = {
        textDecoration:'none',
        cursor:'pointer'
    }

    return(
        <>
            <Container sx={form}>
                {post.map((p, i) => (
                        <Box sx={box} key={i}>
                            <Link href={`/profile/${p.author[0]._id}`} sx={link} ><Typography>{p.author[0].name}</Typography></Link>
                            <Link href={`/post/${p._id}`}>
                                <Card sx={{cursor:'pointer', height:'10%'}}>
                                    <CardMedia 
                                        component="img"
                                        image={p.imagePost[0].url}/>
                                </Card>
                            </Link>
                            <Typography>{p.title}</Typography>
                            <Typography>{p.description}</Typography>
                        </Box>
                    ))}
            </Container>
        </>
    )
}

export default All;