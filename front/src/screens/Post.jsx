import { Box, Card, CardMedia, Container, Typography, Link } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
    }

    const deletePost = async(id) => {
        const res = await axios.delete(`/api/post/delete/${id}`)
        navigate(`/profile/${userId}`)
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
        width:{
            xs:'100%',
            md:'50%'
        }
        
        
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
                            <Link href={`/profile/${idAuthor}`} sx={{textDecoration:'none', cursor:'pointer', color:'#3279a8'}}>
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
                            <Box sx={{ cursor:'pointer', display:'flex', gap:'10px'}}>
                            <DeleteIcon onClick={() => {deletePost(post._id)}}/>
                            <EditIcon onClick={() => {gotoUpdate(post._id)}}/>
                        </Box>
                        </> : ''}

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
            </Container>
                

           
        {/* </Box> */}
        </>
    )
}

export default Post