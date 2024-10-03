import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent, Container, Card, CardMedia, Divider} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const All = () => {
    const [post, setPost] = useState([])
    const userId = localStorage.getItem('userId')

    const fetching = async() => {
        const res = await axios.get(`/api/post/`)
        const data =  res.data.posts
        
        setPost(data)
        
        // data.map(i => {
        //     console.log(i.likes.some(like => like._id === userId));
        // })
    }

    const liked = async(id) => {
        try {
            const data =  await axios.post(`/api/post/like/${id}`)
            fetching()
        } catch (error) {
            
            console.log(error)
        }
    }
    useEffect(() => {
        fetching()
    }, [])

    const form = {
        marginTop:'7rem',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    }

    const box ={
        display:"flex",
        flexDirection:"column",

        width:{
            sm:"99%",
            md:'70%',
            lg:'50%'
        },
        gap:'10px', marginBottom:'15px', padding:'1rem',
        // backgroundColor:'rgba(0,0,0,0.1)',

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
                            <Link href={`/post/${p._id}`}>
                                <Card sx={{cursor:'pointer', height:'10%'}}>
                                    <CardMedia 
                                        component="img"
                                        image={p.imagePost[0].url}/>
                                </Card>
                            </Link>
                            <Box sx={{borderRadius:'10px', padding:'7px', display:'flex', flexDirection:'column', gap:'10px', backgroundColor:'rgba(0,0,0,0.1)'}}>
                                <Box sx={{display:'flex', gap:'1rem', borderRadius:'10px'}}>
                                    <Typography>{p.likes.length} Likes</Typography>
                                    {p.likes.some((l) => l._id === userId) ? 
                                    <>
                                        <FavoriteIcon 
                                            sx={{
                                            color:'red', cursor:'pointer'
                                            }}
                                            onClick={() => liked(p._id)}
                                        />
                                    </> : <>
                                        <FavoriteIcon 
                                            sx={{
                                            '&:hover':{color:'red', cursor:'pointer'}
                                            }}
                                            onClick={() => liked(p._id)}
                                        />
                                    </>}
                                    
                                </Box>
                                <Box>
                                    <Link href={`/profile/${p.author[0]._id}`} sx={link}><Typography sx={{fontWeight:'bold'}}>{p.author[0].name}</Typography></Link>
                                    <Typography>{p.description}</Typography>
                                </Box>

                            </Box>
                            <Divider sx={{marginY: 2}} /> 
                        </Box>
                    ))}
            </Container>

        </>
    )
}

export default All;