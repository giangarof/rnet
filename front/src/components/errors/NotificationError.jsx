import {useState, useEffect} from 'react';
import {Snackbar, SnackbarContent} from '@mui/material';

const NotificationError = ({message}) => {
    const [open, setOpen]= useState(false)
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
        backgroundColor:'red'
    }
    return(
        <>  
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <SnackbarContent sx={popup} message={message}/>
            </Snackbar>
        </>
    )
}

export default NotificationError;