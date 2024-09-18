import { Box, Card, CardMedia, Container, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Post = () => {
    const [post,setPost] = useState('')
    const [image,setImage] = useState('')
    const {id} = useParams()

    const fetching = async() => {
        const res = await axios.get(`/api/post/${id}`)
        setPost(res.data.post)
        setImage(res.data.post.imagePost)
        console.log(res.data.post)
    }

    useEffect(() => {
        fetching()
    },[])
    const form = {
        // backgrounColor:'red',
        marginTop:'10rem',
        
    }
    return (
        <>
        {/* <Box sx={form}> */}
            <Container sx={form}>
                <Box  sx={{backgroundColor:'rgba(0, 0, 0, 0.03)', padding:'10px', width:'200px'}}>
                    {/* {post ?
                        <Link href={}>
                            <Typography 
                                sx={{padding:'5px'}} >{post.author[0].name}
                            </Typography> 
                        </Link> : 
                        'Cannot display name.'
                    } */}
                    {image ? 
                    <Card sx={{width:'200px'}}>
                        <CardMedia component='img' image={image[0].url} sx={{width:'200px'}}/> 
                    </Card> : `Image can't be displayed...`}

                    <Box sx={{padding:'5px'}}>

                        <Typography>{post.title}</Typography>
                        <Typography>{post.description}</Typography>
                    </Box>
                </Box>
            </Container>
                

           
        {/* </Box> */}
        </>
    )
}

export default Post