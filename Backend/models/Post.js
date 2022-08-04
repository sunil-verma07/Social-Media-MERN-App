import mongoose from "mongoose"

const postSchema = new mongoose.Schema({

    caption:{type:String},

    image:[{
        public_id:String,
        url:String
    }],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    created_at:{
        type:Date,
        default:Date.now()

    },

    likes:[{
        
            type:mongoose.Schema.Types.ObjectId,
        ref:"User"
         
    }],

    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
            required:[true,"Please Enter Your Comment"]
        }
    }]



})

export default mongoose.model("Post",postSchema)