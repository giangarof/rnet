import * as React from 'react';
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios'
const UpdatePost = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [imagePost, setImagePost] = React.useState('')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)

    // fetch the data
    const data = async () => {
        const res = await axios.get(`/api/post/${id}`)
        const post = res.data.post
        setTitle(post.title)
        setDescription(post.description)
        setImagePost(post.imagePost)
        console.log(post.imagePost)
    }

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImagePost(file)
        console.log(file)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    // submit the update
    const submitUpdate = async() => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("imagePost", imagePost);

        
        const update = await axios.put(`/api/post/update/${id}`, formData)
        console.log(update)
        navigate(`/profile/${userId}`)
        
    }


    
    React.useEffect(() => {
        data()
    },[])



    const sx = {
        marginTop:'5rem'
    }
    return (
        <>
           <Container sx={sx}>
            <Stack sx={{
                        mt:10,
                        width:{
                        xs:'90%',
                        lg: '50%'
                        }
                    }} 
                    display="flex"
                    flexDirection="column"
                    gap={3}>
            <TextField  id="outlined-basic" label="Title" variant="outlined" 
                value={title} 
                onChange={handleTitle}
                />
            <TextField  id="outlined-basic" label="Description" variant="outlined" 
                value={description}
                onChange={handleDescription}
                />
            {/* <Button
                component="label"
                variant="contained"
                // startIcon={<CloudUploadIcon />}
                >
                    {imagePost.name ? (
                        imagePost.name
                    
                
                    ) : (
                        <>                            
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={FileUpload}
                                // multiple
                            />
                        </>
                    )}
                </Button> */}
                <input type='File' onChange={FileUpload}/>
            <Button variant="contained" color="success" onClick={submitUpdate}>Update</Button>
            </Stack>
        </Container>
        </>
    )
}

export default UpdatePost;