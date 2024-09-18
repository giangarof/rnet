import Post from "../model/post.js"
import User from "../model/user.js"

// create post
const createPost = async (req,res) => {
    const {title, imagePost, description } = req.body;
    // Get the body post
    const post = new Post(req.body);
    // find the user
    const user = await User.findById(req.user._id);

    try {
        // image upload handler
        post.imagePost = req.files.imagePost.map(f => ({
            url: f.path, 
            filename: f.filename, 
            originalname:f.originalname
        }));
        // post.author object, attach id and the name
        post.author = {_id: req.user._id, name: req.user.name}
        // user.posts object, push the post
        user.posts.push(post)
        // save it
        await post.save()
        await user.save()
        res.status(201).json({message:'Post created', post})
        
    } catch (error) {
        throw new Error(error)
    }


}

// get all posts
const findAll = async(req,res) => {
    const posts = await Post.find({})
    res.status(200).json({posts})
}

// get one post
const findPost = async (req,res) => {
    const {id} = req.params;
    const post = await Post.findById(id).populate('reviews')
    res.status(200).json({message:'Found', post})
    // console.log(post)
}   

// update post
const update = async (req, res) => {
    const {id} = req.params;
    const {title, imagePost, description} = req.body;
    const post = await Post.findById(id)

    try {
        if(!post){
            res.status(404).json({message:`Post doesn't exist, or it was deleted.`})
        }
    
        // Handle post image updates
        if (req.files.imagePost) {
            const imgs = req.files.imagePost.map(f => ({
                url: f.path,
                filename: f.filename,
                originalname: f.originalname
            }));
            if (imgs.length > 0) {
                post.imagePost = imgs;
            }
        }
        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
                await cloudinary.uploader.destroy(filename)
            }
            await post.updateOne({$pull: {imagePost: {filename: { $in: req.body.deleteImages}}}})
        }
    
        if(post){
            post.title = title;
            post.description = description;
            await post.save()
            res.status(200).json({message:`Post Updated Successfully!`, post})
        }
        
        
    } catch (error) {
        throw new Error(error)
    }

}

// delete post
const deletePost = async (req,res) => {
    const {id} = req.params;
    
    // id from the POST MODEL DATABASE | Look up the post
    const post = await Post.findById(id);
    // const postOwner = await User.findById(userPostId)
    const user = req.user.userId;
    // console.log(user)
    // If the post dont exist
    if(!post){
        res.status(404).json({message:`Post dont exist.`})
    }
    
    const postOwner = post.author[0]._id.equals(user)
    const userIsAdmin = user.isAdmin
    // console.log(postOwner)
    const deletion = async () => {
        // find the user
        const user = await User.findById(post.author[0]._id)
        // find the post
        // const postToDelete = postId._id

        // the filter method create a new array with a specific value
        // here, i'm excluding the id
        user.posts =  user.posts.filter(i => i != id)
        // save it with the new array
        await Post.findByIdAndDelete(id)
        await user.save()
    }

    if(userIsAdmin){
        deletion()
        res.status(401).json({message:`Deleted as admin.`})
    } else if(!postOwner){
        res.status(401).json({message:`You're not the owner of the post.`})
    } else {
        deletion()
        res.status(200).json({message:'Post deleted successfully!'})
    
    }
    // Two ways to compare the id's
    // console.log(JSON.stringify(req.user._id) === JSON.stringify(userPostId))
    // console.log(!req.user._id.equals(userPostId));

}

// like post
const like = async(req,res) => {
    // userId
    const user = req.user._id;
    // id post
    const { id } = req.params
    const post = await Post.findById(id)

    const like = post.likes.some((x) => {return x.equals(user._id) })

    try {
        if(like){
            post.likes.pull(user)
        } else {
            post.likes.push(user)
        }
        await post.save()
        res.status(200).json({message: like ? 'Unlike' : 'liked', post})
        
    } catch (error) {
        throw new Error(error)
    }
    
}

export {
    findAll,
    createPost,
    findPost,
    deletePost,
    update,
    like,

}