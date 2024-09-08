import {Schema, mongoose} from 'mongoose';
import { type } from 'os';

const postSchema = new mongoose.Schema({
    author:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:{
            type:String
        },
    }],
    title:{
        type:String,
        // required: true
    },
    description:{
        type:String,
        // required: true
    },
    imagePost:[
        {url:String,filename:String,originalname:String}
    ],
    likes:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }],
    reviews:[{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
        
        // name:{
        //     type:String
        // }
    }]

}, {timeStamp:true});

const Post = mongoose.model('Post', postSchema);
export default Post;