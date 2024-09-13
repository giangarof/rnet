import { Box, Button, Typography, Paper, Avatar, Container, Tooltip, Link, CardMedia, Card } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const ProfileUser = () =>{
    
    const [user, setUser] = useState('')
    const [img, setImages] = useState('')
    const location = useLocation()
    // console.log(location.pathname)
    const navigate = useNavigate()

    const goToUpdateProfile = () => {navigate(`${location.pathname}update`)}
    const createPost = () => navigate(`/create`)

    useEffect(() => {
        const profile = async() => {
            const user = await axios.get(`/api/user/${location.pathname}`)
            setUser(user.data.user)
            
            const arr = user.data.user.posts
            const arr1 = arr.map(i => i.imagePost)
            const arr2 = (arr1.map(i => i[0].url))
            const arr3 = (arr2.map(i => (i)))
            setImages(arr1)
            // console.log(arr1)

        }
        profile()

    }, [])
    return (
        <>  
            {user.headerImage?.src ? (
                <Container>
                    <img 
                        src={user.headerImage?.src} 
                        alt="profile image" 
                        style={{width:"100%", height:"300px", objectFit:"contain", cursor:'pointer'}} />
                </Container>
            ) : (
                <Link onClick={goToUpdateProfile}>
                    <Tooltip title="Header image can be updated.">
                            <Container>
                                <img 
                                    src='/icon.jpg' 
                                    alt="profile image" 
                                    style={{width:"100%", height:"300px", objectFit:"contain", cursor:'pointer'}} />
                            </Container>
                    </Tooltip>
                </Link>
            )}
            
            {user.profileImage?.src ? (
                <Avatar src={user.profileImage?.src} alt="profile image"/>
            ) : (
                    <Link onClick={goToUpdateProfile}>
                        <Tooltip title="Image Profile can be updated.">
                            <Avatar src='/icon.jpg' sx={{width:100, height:100}}/>
                        </Tooltip>
                    </Link>
            )}

            <Typography>{user.name}</Typography>
            <Typography>Alias: {user.username}</Typography>
            <Box sx={{display:'flex', gap:'10px'}}>
                <Typography>Followers: {user.followers?.length}</Typography>
                <Typography>Following: {user.followers?.length}</Typography>
            </Box>
            <Button variant="contained" onClick={goToUpdateProfile}>Update</Button>

            <Container>
                {user.posts?.length === 0 ? (
                    <Link onClick={createPost} sx={{cursor:'pointer'}}>
                        <Typography>No post's.</Typography>
                    </Link>
                ) : ( 
                    <>
                        {img.length > 0 && img.map((img, i) => (
                            <Card 
                               >
                                {Array.isArray(img.imagePost) && img.imagePost.length > 0 && (
                                    <CardMedia                                
                                        component='img'
                                        image={img.imagePost[0].url}
                                    />
                                )}

                                
                            </Card>
                        ))}
                    </>
                    
                )} 
            </Container>
        </>
    )
}

export default ProfileUser
    