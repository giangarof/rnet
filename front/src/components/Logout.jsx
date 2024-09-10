import {Box, TextField, Button, Typography, Link, Snackbar, SnackbarContent} from '@mui/material';

const Logout = () => {

    const logout = () => {
        alert('clicked')
    }
    return (
        <>
            <Typography onClick={logout}>Logout</Typography>
        </>
    )
}

export default Logout;