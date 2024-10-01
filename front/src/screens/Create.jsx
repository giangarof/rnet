import { Button, Container, Stack, styled, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imagePost, setImagePost] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const userId = localStorage.getItem('userId')

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImagePost(file)
        // console.log(file)
    }

    const post = async(e) => { 
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("imagePost", imagePost);
        const data = await axios.post('/api/post/create', formData)
        navigate(`/profile/${userId}`)
        // console.log(data)
    }
    
    const container = {
        marginTop:'8rem',
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    return (
        <Container sx={container}>
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
                onChange={(e) => setTitle(e.target.value) }/>
            <TextField  id="outlined-basic" label="Description" variant="outlined" 
                value={description}
                onChange={(e) => setDescription(e.target.value) }/>
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
            <Button variant="contained" color="success" onClick={post}>Create</Button>
            </Stack>
        </Container>
    )
}

export default Create;