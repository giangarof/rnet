import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    Menu,
    IconButton,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Typography,
    Link } from '@mui/material';


import axios from 'axios';

const Navbar = () => {
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()

    const logout = async() => {
        const user = await axios.post('/api/user/logout')
        localStorage.removeItem('userId')
        localStorage.removeItem('name')
        navigate('/login', { state: { message: `${user.data?.message}` || 'See you soon!'} })
        location.reload()
    }
    
    React.useEffect(() => {
        const id = localStorage.getItem('userId')
        const name = localStorage.getItem('name')
        setId(id)
        setName(name)
        
    },[])
    
    return(
        <>
            <AppBar>
                <Container>
                  Navbar
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar;