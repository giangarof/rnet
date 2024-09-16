import { Box, Button, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [banner, setBanner] = useState('')
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const fetching = async() => {
        const res = await axios.get(`/api/user/profile/${userId}`)
        const userData = res.data.user;
        setName(userData.name)
        setUsername(userData.username)
        setEmail(userData.email)
        setPassword(userData.password)
        setProfileImg(userData.profileImg)
        setBanner(userData.headerImage)
    }

    const profileUpload = (e) => {
        const file = e.target.files[0]
        setProfileImg(file)
        // if(file){
        //     setProfileImg(reader.result)
        //     // const reader = new FileReader()
        //     // reader.onloadend = () => {

        //     // }
        //     // reader.readAsDataURL(file);
        // }
    }

    const bannerUpload = (e) => {
        const file = e.target.files[0]
        setBanner(file)
        
        // if(file){
        //     const reader = new FileReader()
        //     reader.onloadend = () => {

        //     }
        //     reader.readAsDataURL(file);
        // }
    }

    const update = async(e) => {
        e.preventDefault()
                const formData = new FormData();
                formData.append("name", name);
                formData.append("username", username);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("confirmPassword", passwordConfirm);
                formData.append('profileImage', profileImg);
                formData.append('headerImage', banner);
                try {
                const data = axios.put(`/api/user/update/${userId}`, formData)
                const res = await data
                navigate(`/profile/${userId}`)
            
        } catch (error) {
            console.log(error)
        }
        
    }
    

    useEffect(() => {
        fetching()
    }, [])

    const form = {
        display:'flex',
        flexDirection:'column',
        gap:'2rem'
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
        <>
            <Box
                component="form"
                sx={form}
                noValidate
                autoComplete="off"
                >
                <Typography variant='h4'>Update credentials</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" />
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" />
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type="password" />
                <TextField value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} label="Password Confirmation" type="password" variant="outlined" />

                <Button
                component="label"
                variant="contained"
                // startIcon={<CloudUploadIcon />}
                >   
                    Upload Profile Image
                    <VisuallyHiddenInput
                        type="file"
                        onChange={profileUpload}
                                // multiple
                        />
                </Button>
                {/* {profileImg && typeof profileImg === 'string' && <img src={profileImg} alt="Profile" style={{ width: '300px', height: 'auto' }} />} */}


                <Button
                component="label"
                variant="contained"
                >   
                    Upload Banner Image
                    <VisuallyHiddenInput
                        type="file"
                        onChange={bannerUpload}
                                // multiple
                        />   
                </Button>
                {/* {banner && typeof banner === 'string' && <img src={banner} alt="Banner" style={{ width: '300px', height: 'auto' }} />} */}

                <Button variant='contained' onClick={update}>Complete Update</Button>

                {/* <NotificationError message={errorMsg} /> */}
            </Box>
            
        </>
    )
}

export default UpdateForm;