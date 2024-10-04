import { Box, Card, CardMedia, Container, Typography, Link } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ReviewBox from "../components/ReviewsBox.jsx";

const Post = () => {
    const [post,setPost] = useState('')
    const [idAuthor, setIdAuthor] = useState('')
    const [image,setImage] = useState('')
    const {id} = useParams()
    // console.log(id)
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')

    const fetching = async() => {
        const res = await axios.get(`/api/post/${id}`)
        setPost(res.data.post)
        setImage(res.data.post.imagePost)
        setIdAuthor(res.data.post.author[0]._id)
        console.log(res.data.post)
    }

    const deletePost = async(id) => {
        const res = await axios.delete(`/api/post/delete/${id}`)
        navigate(`/profile/${userId}`)
    }

    const deleteReview = async(id) => {
        try {
            const res = await axios.delete(`/api/review/delete/${id}`)
            console.log(res.data.message)
            fetching()
            
        } catch (error) {
            console.log(error.response.statusText)
        }
    }

    const liked = async(id) => {
        try {
            const data =  await axios.post(`/api/post/like/${id}`)
            console.log(data)
            fetching()
        } catch (error) {
            console.log(error)
        }
    }

    const likedRev = async(id) => {
        try {
            const data =  await axios.post(`/api/review/like/${id}`)
            console.log(data)
            fetching()
        } catch (error) {
            console.log(error)
        }
    }

    const gotoUpdate = async (id) => {
        navigate(`/post/update/${id}`)
    }

    useEffect(() => {
        fetching()
    },[])


    const form = {
        // backgrounColor:'red',
        marginTop:'8rem',
        marginBottom: '5rem',
        display:'flex', flexDirection:'column',
        gap:'1rem',
        width:{
            xs:'100%',
            md:'50%'
        }
    } 

    const name = {
        textDecoration:'none', 
        cursor:'pointer', 
        color:'#3279a8'
    }
    
    return (
        <>
        {/* <Box sx={form}> */}
            <Container sx={form}>
                <Box  
                    sx={{
                        backgroundColor:'rgba(0, 0, 0, 0.03)', padding:'10px', borderRadius:'10px',
                        // width:'100%'
                    }}>
                    {post ?
                        <Typography sx={{padding:'10px 0px 10px 0px'}}>
                            <Link href={`/profile/${idAuthor}`} sx={name}>
                                {post.author[0].name}
                            </Link>
                         </Typography>
                         : 
                        'Cannot display name.'
                    }
                    {image ? 
                    <Card>
                        <CardMedia component='img' image={image[0].url}/> 
                    </Card> : `Image can't be displayed...`}
                    
                    <Container sx={{marginTop:'2rem'}}>
                        {/* if user is owner */}
                        {userId === idAuthor ? <>
                            <Box sx={{ cursor:'pointer', display:'flex', flexDirection:'row', justifyContent:'space-between', gap:'10px'}}>
                                <Box sx={{display:'flex', gap:'1rem'}}>
                                    <Typography>{post.likes.length} Likes</Typography>
                                    {post.likes.some((l) => l._id === userId) ? 
                                    <>
                                        <FavoriteIcon 
                                            sx={{
                                            color:'red', cursor:'pointer'
                                            }}
                                            onClick={() => liked(post._id)}
                                        />
                                    </> : <>
                                        <FavoriteIcon 
                                            sx={{
                                            '&:hover':{color:'red', cursor:'pointer'}
                                            }}
                                            onClick={() => liked(post._id)}
                                        />
                                    </>}
                                </Box>
                                <Box>

                                    <EditIcon onClick={() => {gotoUpdate(post._id)}} sx={{'&:hover':{color:'blue', cursor:'pointer'}}}/>
                                    <DeleteIcon onClick={() => {deletePost(post._id)}} sx={{'&:hover':{color:'red', cursor:'pointer'}}}/>
                                </Box>
                            </Box>
                        </> : <>
                                <Box sx={{display:'flex', gap:'1rem'}}>
                                    <Typography>{post.likes?.length} Likes</Typography>
                                    {post.likes?.some((l) => l._id === userId) ? 
                                    <>
                                        <FavoriteIcon 
                                            sx={{
                                            color:'red', cursor:'pointer'
                                            }}
                                            onClick={() => liked(post._id)}
                                        />
                                    </> : <>
                                        <FavoriteIcon 
                                            sx={{
                                            '&:hover':{color:'red', cursor:'pointer'}
                                            }}
                                            onClick={() => liked(post._id)}
                                        />
                                    </>}
                                </Box>
                        </>}

                        <Box 
                            sx={{
                                padding:'5px', 
                                marginTop:'10px', 
                                backgroundColor:'rgba(0,0,0,0.1)',
                                borderRadius:'10px'
                            }}>
                            <Typography>-{post.title}</Typography>
                            <Typography>-{post.description}</Typography>
                        </Box>
                    </Container>
                </Box>

                <ReviewBox postId={post._id} func={fetching}/>

                <Box 
                    sx={{
                        display:'flex', flexDirection:'column', gap:'1rem'
                    }}>
                    {post.reviews?.map((i, k) => (
                        <Box key={k} sx={{backgroundColor:'rgba(0,0,0,0.06)', padding:'7px', borderRadius:'12px'}}>
                            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                <Link href={`/profile/${i.author[0]._id}`} sx={name}>
                                    <Typography>{i.author[0].name}</Typography>
                                </Link>
                                <Box>
                                    <Typography>{i.likes?.length} Likes</Typography>
                                    {i.likes.some((l) => l._id === userId) ? <> 
                                        <FavoriteIcon sx={{
                                            color:'red', cursor:'pointer'
                                            }}
                                            onClick={() => likedRev(i._id)}/>
                                    </> : <> 
                                        <FavoriteIcon sx={{
                                            '&:hover':{color:'red', cursor:'pointer'}
                                            }}
                                            onClick={() => likedRev(i._id)}/>
                                    </>}

                                    
                                    {userId === i.author[0]._id ? 
                                        <>
                                    
                                            <DeleteIcon sx={{'&:hover':{color:'red', cursor:'pointer'}}} onClick={() => deleteReview(i._id)}/>
                                        </> : idAuthor === userId ? <>
                                            <DeleteIcon sx={{'&:hover':{color:'red', cursor:'pointer'}}} onClick={() => deleteReview(i._id)}/>
                                        </> : <></>
                                    }
                                    {/* {userId}, post:{idAuthor}, {i.author[0]._id} */}
                                </Box>
                                </Box>
                            <Typography>{i.content}</Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
                

           
        {/* </Box> */}
        </>
    )
}

export default Post