import Review from "../model/review.js";
import Post from "../model/post.js"
import User from "../model/user.js"


const create = async(req,res) => {
    // find the post
    const {id} = req.params;
    const post = await Post.findById(id)

    // get the content from the body.
    const content = req.body;
    const review = new Review(content)

    // get the author
        const author = req.user.userId
        const user = await User.findById(author)
        review.author = {
            _id: author, 
            name: user.name, 
            ownerPost: post.author[0]._id
        };

    post.reviews.push(review)
    await post.save()
    await review.save()

    console.log(review)

    res.status(200).send({message:'Review created', review})
    
}

const update = async(req,res) => {
    const {id, reviewId} = req.params
    const {content} = req.body
    const review = await Review.findById(reviewId)
    
    try {
        if(!review){
            res.status(404).json({message:`Review doesnt exist.`})
        } else {
            review.content = content
            await review.save()
            res.status(404).json({message:`Review updated successfully!`})
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

const deleteReview = async(req,res) => {
    const user = req.user.userId
    const {reviewId} = req.params;
    const review = await Review.findById(reviewId)
    try {
        if(!review){
            res.status(404).json({message:`Review doesnt exist.`})
        } else {
            await Review.findByIdAndDelete(reviewId)
            res.status(200).json({message:`Review deleted successfully!`})
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

const like = async(req,res) => {
    const {reviewId} = req.params;
    const user = req.user.userId

    const review = await Review.findById(reviewId)

    const like = review.likes.some((x) => {return x.equals(user) })

    try {
        if(like){
            review.likes.pull(user)
        } else {
            review.likes.push(user)
        }
        await review.save()
        res.status(200).json({message: like ? 'Unlike' : 'liked', review})
        
    } catch (error) {
        throw new Error(error)
    }
   
}

export {
    create,
    update,
    deleteReview,
    like
}
