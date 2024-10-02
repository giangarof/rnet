import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewBox = ({func}) => {
    
    const [content, setContent] = useState('')
    const {id} =useParams()

    const review = async(e) => {
        e.preventDefault()
        try {
            const data = await axios.post(`/api/review/create/${id}`, {content})
            console.log(data)
            func()
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <TextField 
                fullWidth 
                label="Add a comment" 
                id="fullWidth" 
                value={content} 
                onChange={(e) => setContent(e.target.value) }/>
            <Button onClick={review}>Add Review</Button>
        </>
    )
}

export default ReviewBox