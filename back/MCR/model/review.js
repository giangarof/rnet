import {Schema, mongoose} from 'mongoose'; 
import { type } from 'os';

const reviewSchema = new mongoose.Schema({
    author:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:{
            type:String
        },
        ownerPost:{
            type:String
        }
    }],
    content:{
        type:String
    },
    likes:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }]

});

const review = mongoose.model('Review', reviewSchema);
export default review;