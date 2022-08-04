import Post from '../models/Post.js'
import User from "../models/User.js"
import ErrorHandler from '../utils/errorHandler.js'
// import  {sendEmail}  from "../middleware/sendEmail.js"
// import crypto from "crypto"
import cloudinary from "cloudinary"

import catchAsyncError from '../middleware/catchAsyncError.js'

export const createUser= catchAsyncError(async(req,res,next)=>{
    
        const {name , email,userName, password,avatar} = req.body;

        const isEmailExist = await User.findOne({email:email})
        if(isEmailExist){
            return next(new ErrorHandler("Email already exists",400))
        }
        const isUserNameExist = await User.findOne({userName:userName})
        if(isUserNameExist){
            return next(new ErrorHandler("UserName already exists",400))
        }

        const user = await User.create({
            name,
            email,
            userName,
            password,
            avatar
        })

        const token = await user.generateToken()

        res.status(200).cookie("token", token,{
                       expires:new Date(Date.now() + 90*24*60*60*1000),
                        httpOnly:true
                    }).json({success:true, user})

  
})

export const logoutUser= catchAsyncError((req, res)=>{

    res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
        success:true,
        message:"Logged Out"
    })
    
})




export const login = catchAsyncError(async(req, res,next)=>{

    
        const {email , password} = req.body

        if(!email || !password){
            return next(new ErrorHandler("Please Enter Login details First",400))
        }

        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorHandler("Invalid Details",400))
        }

        const isMatch = await user.matchPassword(password)
        
        if(!isMatch){
            return next(new ErrorHandler("Invalid Details",400))
        }

        const token = await user.generateToken();

        res.status(200).cookie("token", token,{
            expires:new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true
        }).json({success:true, user})

})

export const followUser = catchAsyncError(async(req, res,next)=> {

    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id)


        if(!userToFollow){
            return next(new ErrorHandler("User not Found",404))
        }

    if(loggedInUser.following.includes(userToFollow._id)){

        const indexFollowing = loggedInUser.following.indexOf(userToFollow._id)
        

        const indexFollower = userToFollow.followers.indexOf(loggedInUser._id)


        loggedInUser.following.splice(indexFollowing, 1)
        userToFollow.followers.splice(indexFollower, 1) 

        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message:"User Unfollowed"
        })

    }
    else{
        userToFollow.followers.push(loggedInUser._id);
    loggedInUser.following.push(userToFollow._id);

    await userToFollow.save();
    await loggedInUser.save();

    res.status(200).json({
        success:true,
        message:"User Followed"
    })
    }

})

export const updatePassword= catchAsyncError(async(req, res,next)=>{
    
        const user = await User.findById(req.user._id).select("+password")

        const {newPassword, oldPassword} = req.body

        if(!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please Enter Old And New Password",400))
        }
        
        const isMatch = await user.matchPassword(oldPassword)

        if(!isMatch){
            return next(new ErrorHandler("Old password is Incorrect",400))
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message:"Password updated successfully"
        })
})

export const updateProfile = catchAsyncError(async(req, res)=>{
   
    const user = await User.findById(req.user._id);

    const {name ,userName, email} = req.body;

    if(name){
        user.name = name
    }
    if(userName){
        user.userName =userName;
    }
    if(email){
        user.email = email
    }

    await user.save()

    res.status(200).json({
        success: true,
        message:"User updated successfully",
        user
    })
       
})

export const updateProfilePic = catchAsyncError(async(req, res)=>{
   
    const user = await User.findById(req.user._id);
    
    const profilePic = await cloudinary.v2.uploader.upload(req.body.avatar,{
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
        folder:'avatar'
    })

    user.avatar={
        public_id:profilePic.public_id,
        url:profilePic.secure_url
    }

    await user.save()

    res.status(200).json({
        success: true,
        message:"Avatar Updated successfully"
    })
       
})

export const deleteAccount= catchAsyncError(async(req, res)=> {
    
        const user = await User.findById(req.user._id)
        const posts = await user.posts
        const followers = user.followers
        const userId = user._id

        await user.remove();

        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})

        for(let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.remove() 
        }

        for(let j = 0; j < followers.length; j++) {
            const follower = await User.findById(followers[j]);

            const index = follower.following.indexOf(userId)

            follower.following.splice(index, 1)
            followers.save();  

        }
        res.status(200).json({
            success: true,
            message:"User removed successfully"
        })
})

export const userProfile = catchAsyncError(async(req, res)=>{
 
    const user = await User.findById(req.user._id).populate("posts").populate("followers").populate("following")

    res.status(200).json({
        success:true,
        message:"User profile found",
        user})

})

export const getUserProfile=catchAsyncError(async(req, res)=>{
  
        const user = await User.findById(req.params.id).populate("posts").populate("followers").populate("following")

        if(!user){
            return next(new Error("User Not Found",404))
        }

        res.status(200).json({
            success:true,
            user
        })

})

export const searchUserProfile=catchAsyncError(async(req, res,next)=>{

    const users = await User.find({userName: {$regex : req.query.userName , $options:"i"}})

    res.status(200).json({users})
   
})
