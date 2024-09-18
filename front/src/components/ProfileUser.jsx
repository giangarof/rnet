import { Box, Button, Typography, Paper, Avatar, Container, Tooltip, Link, CardMedia, Card, AppBar, Toolbar } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
const ProfileUser = () =>{
    const [user, setUser] = useState('')
    const [post, setPost] = useState([])
    const userId = localStorage.getItem('userId')
    // console.log(location)
    const navigate = useNavigate()

    const goToUpdateProfile = () => {navigate(`/profile/${userId}/update`)}
    const createPost = () => navigate(`/create`)
    // console.log(userId)

    const goTopost = (e) => {
        e.preventDefault()
        // navigate(`/post/${i}`)
        console.log(i)
    }

    const profile = async() => {
        const res = await axios.get(`/api/user/profile/${userId}`)
        const userData = res.data.user;
        setUser(userData)

        const postsData = userData.posts?.map(post => ({
            id: post._id, // Assuming the id is stored in _id
            imagePost: post.imagePost[0]?.url || '' // Fallback if no image exists
        })) || [];

        setPost(postsData)
        console.log(postsData)

    }
    useEffect(() => {
        profile()

    }, [])
    return (
        <>  
            {user.headerImage ? (
                <Container>

                            <Box 
                                component='img'
                                src={user.headerImage[0].url} 
                                sx={{
                                    width: '100%',  // 90% of viewport width
                                    height: '50vh',  // 100% of the header's height (which is 40vh)
                                    objectFit: 'contain',  // Cover the space without distortion
                                  }}
                            />
            
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
            
            {user.profileImage ? (
                <Box 
                    component='img' 
                    src={user.profileImage[0].url} 
                    alt="profile image" 
                    sx={{width:'150px', height:'150px', borderRadius:'50%', objectFit:'cover'}}/>
            ) : (
                    <Link onClick={goToUpdateProfile}>
                        <Tooltip title="Image Profile can be updated.">
                            <Avatar src='/icon.jpg' sx={{width:"300px", height:"300px"}}/>
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

            <Container sx={{
                    display: 'grid',
                    alignContent:'center',
                    width:'100%',
                    gridTemplateColumns: {
                        sm: 'repeat(1, 1fr)',  
                        md: 'repeat(3, 1fr)',  
                    },
                    gap: 1,
                    marginBottom:5,
                    marginTop:5
            }}>
                {user.posts?.length === 0 ? (
                    <Link onClick={createPost} sx={{cursor:'pointer'}}>
                        <Typography>No post's.</Typography>
                    </Link>
                ) : ( 
                    <>
                       

                            {post.length > 0 && post.map((post, i) => (
                                <Link href={`/post/${post.id}`}>

                                    <Card 
                                        sx={{cursor:'pointer'}}
                                        key={i}
                                          
                                    > 
                                            <CardMedia
                                                component='img' 
                                                image={post.imagePost}
                                            />
                                    </Card>
                                </Link>
                            ))}
                        
                    </>
                    
                )} 
            </Container>
        </>
    )
}

export default ProfileUser
    