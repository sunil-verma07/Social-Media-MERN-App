import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import crypto from "crypto.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
      },
    userName:{
        type: String,
        required: [true, "Please enter your userName"],
        unique: [true, "UserName already exists"]
    },
      avatar: {
        public_id: {
              type:String,
              default:"public_id"
        },
        url: {
              type:String,
              default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xSz0eMW7GmpKukczOHvPWWGDqaBCqWA-Mw&usqp=CAU"
        }
      },
    
      email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
      },
      password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
      },
    
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
      followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    });
    

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
    next();
    }
});

userSchema.methods.matchPassword = async function(password){

   return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
};



export default mongoose.model("User",userSchema)