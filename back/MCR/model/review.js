import {Schema, mongoose} from 'mongoose'; 

const reviewSchema = new mongoose.Schema({
    author:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:{
            type:String
        },
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