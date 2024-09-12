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
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'

import axios from 'axios';

const pages = ['Login', 'Signup'];
const settings = ['Profile', 'Home', 'Settings', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const logout = async() => {
        const user = await axios.post('/api/user/logout')
        navigate('/login', { state: { message: `${user.data?.message}` || 'See you soon!'} })
    }
    
    const profile = async() => {
        
    }
    
    return(
        <>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        // letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        RNet
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                        {pages.map((page) => (
                            
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Link href={`/${page.toLowerCase()}`}  sx={{ textAlign: 'center' }}>{page}</Link >
                            </MenuItem>
                    
                        
                        ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        // letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Rnet
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            href={`/${page.toLowerCase()}`}
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton 
                            onClick={handleOpenUserMenu} 
                            // onClick={profile}
                            sx={{ p: 0 }}
                            >
                            <Avatar src="/static/images/avatar/2.jpg" />

                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem 
                                key={setting} 
                                onClick={() => {
                                    if(setting === 'Logout'){
                                        logout()
                                    }else if(setting === 'Profile'){
                                        profile()
                                    }
                                    handleCloseUserMenu
                                    }
                                }>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar;