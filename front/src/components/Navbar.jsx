import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({isUser, imgProfile}) {
  // const [user, setAuth] = React.useState('');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  
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

  const profileNavigation = () => {
    navigate(`/profile/${userId}`)
  }
  
  const login = () => {
    navigate(`/login`)
  }
  
  const signup = () => {
    navigate(`/signup`)
  }
  
  const logout = async() => {
    await axios.post(`/api/user/logout`)
    localStorage.clear()
    navigate(`/login`)
    navigate(0)
  }
  
  // console.log(isUser, imgProfile)
  
  
  return (
    <AppBar >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* LOGO AND ICON MEDIUM DEVICE */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rnet
          </Typography>

            {/* SMALL DEVICE*/}
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
              <MenuItem onClick={handleCloseNavMenu} sx={{display:'flex', flexDirection:'column'}}>
                  {isUser ? (
                    <>
                      <Typography onClick={profileNavigation}>{isUser}</Typography>
                    </>
                ): (
                    <>
                      <Button onClick={() => {handleCloseNavMenu(), login()}} sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                      <Button onClick={() => {handleCloseNavMenu(), signup()}} sx={{ my: 2, color: 'white', display: 'block' }}>Signup</Button>
                    </>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          {/* LOGO AND ICON option SMALL DEVICE*/}
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
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rnet
          </Typography>

            {/* Medium device */}
          <Box sx={{ flexGrow: 1 }}>
            {isUser ? (
                <>
                  <Typography sx={{display:{md:'block', xs:'none'}}}>{isUser}</Typography>
                </>
            ): (
                <>
                  <Button onClick={() => {handleCloseNavMenu(), login()}} sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                  <Button onClick={() => {handleCloseNavMenu(), signup()}} sx={{ my: 2, color: 'white', display: 'block' }}>Signup</Button>
                </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0}} >
            {!isUser ? '' : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={imgProfile} />
                  </IconButton>
                </Tooltip>
              </>
            )}
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
              <MenuItem onClick={handleCloseNavMenu} sx={{display:'flex', flexDirection:'column'}}>
                <Button onClick={() => {handleCloseNavMenu(), logout()}} sx={{ display: 'block' }}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;