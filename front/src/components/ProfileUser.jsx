
import { Box, Button, Typography, Paper, Avatar, Container, Tooltip, Link, CardMedia, Card, AppBar, Toolbar } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
const ProfileUser = () =>{
    const [user, setUser] = useState('')
    const [post, setPost] = useState([])
    const {userId} = useParams()
    // console.log(userId)
    const identification = localStorage.getItem('userId')
    // console.log(identification)
    const navigate = useNavigate()

    const goToUpdateProfile = () => {navigate(`/profile/${userId}/update`)}
    const createPost = () => navigate(`/create`)
    // console.log(userId)

    const profile = async() => {
        const res = await axios.get(`/api/user/profile/${userId}`)
        const userData = res.data.user;
        setUser(userData)
        // console.log(userData)

        const postsData = userData.posts?.map(post => ({
            id: post._id, // Assuming the id is stored in _id
            imagePost: post.imagePost[0]?.url || '' // Fallback if no image exists
        })) || [];

        setPost(postsData)
        // console.log(postsData)

    }

    const follow = async() => {
        const res = await axios.post(`/api/user/follow/${userId}`)
        location.reload()
        // console.log(res)
    }
    const isFollowing = user.followers?.some(follower => follower === identification);
    // console.log(isFollowing)
   
    useEffect(() => {
        profile()
    }, [])
    return (
        <>  

            <Box className="custom"
                sx={{
                    
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    display:{
                        xs:'flex'
                    },
                    flexDirection:{
                        xs:'column'
                    },
                    alignItems:{
                        xs:'center'
                    },
                    width:{
                        xs:'100%'
                    },
                    height:{
                        xs:'100%'
                    },

                    
                }}>
                {/* Header */}
                <Box sx={{}}>
                    {user.headerImage ? (
                        <Box
                            component='img'
                            src={user.headerImage[0]?.url} 
                            sx={{
                                height:{
                                    xs:'60vh'
                                },
                                width:'100%',
                                objectFit:'contain'
                            }}
                        /> 
                    
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
                </Box>

                {/* Profile Image */}
                <Box sx={{
                        width:'100%',
                        display:'flex', 
                        flexDirection:{xs:'column', md:'row'}, 
                        justifyContent:{md:'space-around'},
                        alignItems:'center',
                        margin: '10px 0 10px 0'
                    }}>
                    <Box>
                        {user.profileImage ? (
                            <Box 
                                component='img' 
                                src={user.profileImage[0]?.url} 
                                alt="profile image" 
                                sx={{width:'150px', height:'150px', borderRadius:'50%', objectFit:'cover'}}/>
                        ) : (
                                <Link onClick={goToUpdateProfile}>
                                    <Tooltip title="Image Profile can be updated.">
                                        <Avatar src='/icon.jpg' sx={{width:"300px", height:"300px"}}/>
                                    </Tooltip>
                                </Link>
                        )}
                    </Box>

                    {/* Info card */}
                    <Box>
                        <Container 
                            sx={{
                                backgroundColor:"rgba(0,0,0,0.1)",
                                padding:'5px',
                                borderRadius:'10px',
                                width:'300px',
                            }}
                        
                        >
                            
                            <Box sx={{backgroundColor:'white', padding:'1rem', borderRadius:'10px', margin:'5px 0px 5px 0px'}}>
                                <Typography>{user.name}</Typography>
                                <Typography>Alias: {user.username}</Typography>
                                <Box sx={{display:'flex', gap:'10px'}}>
                                    <Typography>Followers: {user.followers?.length}</Typography>
                                    <Typography>Following: {user.following?.length}</Typography>
                                </Box>
                            </Box>

                            {identification === userId ? (
                                <Box sx={{display:'flex', gap:'1rem', margin:'10px 0px 10px 0px'}}>
                                    <Button variant="contained" onClick={goToUpdateProfile}>Update</Button>
                                    <Button variant="contained">Settings</Button>
                                </Box>
                                
                            ) : (
                                <Box sx={{display:'flex', gap:'1rem', margin:'10px 0px 10px 0px'}}>
                                    <Button variant="contained" onClick={follow}>
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </Button>
                                    
                                </Box>
                            )}
                        </Container>
                    </Box>
                </Box>
            </Box>

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
                                <Link href={`/post/${post.id}`} key={i}>
                                    <Card 
                                        sx={{cursor:'pointer', height:'100%'}}
                                        // key={i}
                                          
                                    > 
                                            <CardMedia
                                            sx={{cursor:'pointer', height:'100%'}}
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
    