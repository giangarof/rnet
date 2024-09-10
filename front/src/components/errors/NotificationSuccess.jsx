import {useState, useEffect} from 'react';
import {Snackbar, SnackbarContent} from '@mui/material';
import { useLocation } from "react-router-dom";

const NotificationSuccess = () => {
    const [open, setOpen]= useState(false)
    const location = useLocation();
    
    const message = location.state?.message

    useEffect(() => {
        if(message){
            setOpen(true)
        } 
    },[message])

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
    }

    const popup = {
        backgroundColor:'green'
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <SnackbarContent sx={popup} message={message}/>
            </Snackbar>
        </>
    )
}

export default NotificationSuccess;