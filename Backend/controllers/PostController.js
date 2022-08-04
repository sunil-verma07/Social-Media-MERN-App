import Post from "../models/Post.js";
import User from "../models/User.js";
import ErrorHandler from '../utils/errorHandler.js'
import catchAsyncError from '../middleware/catchAsyncError.js'
import cloudinary from 'cloudinary'


export const createPost = catchAsyncError(async(req,res)=>{

  const result= await cloudinary.v2.uploader.upload(req.body.image,{
     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
     api_key:process.env.CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_API_SECRET,
     folder:'image'
   }) 
        const newPostData ={
        caption: req.body.caption,
        image:{
            public_id:result.public_id,
            url: result.secure_url
        },
        owner: req.user._id
        };

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.push(newPost._id);

        await user.save();

        res.status(200).json({
            success: true,
            message:"Post Created",
            newPost
        })
})


export const deletePost= catchAsyncError(async(req, res,next)=>{
  
    const post = await Post.findById(req.params.id)

    if(!post){
        return next(new ErrorHandler("Post Not Found",404)) 
    }
   
    if(post.owner.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("Unauthorized",401))
    }

    await post.remove();

    const user = await User.findById(req.user._id)
    const index = await user.posts.indexOf(req.params.id)

    user.posts.splice(index, 1)

    await user.save();

    res.status(200).json({
        success: true,
        message:"Post deleted successfully"
    })
})

export const LikeAndUnlikePost= catchAsyncError(async(req, res,next)=>{

    
        const post = await Post.findById(req.params.id);

        if(!post){
            return next(new ErrorHandler("Post Not Found",404));
        }
        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id)

            post.likes.splice(index, 1)

            await post.save()

            return res.status(200).json({
                success: true,
                message:"Post Unliked"
            })

        }
        else{
            post.likes.push(req.user._id)

            await post.save()

            return res.status(200).json({
                success: true,
                message:"Post Liked"
            })
        }
})

export const getPostOfFollowing= catchAsyncError(async(req,res)=>{

        const user = await User.findById(req.user._id)

    const allposts = await Post.find({
        owner:{
            $in : user.following,
        },
      
    }).populate('owner').populate('comments.user')
    res.status(200).json({
        success:true,
        allposts,
    })
})

export const updateCaption = catchAsyncError(async(req, res,next)=>{
    

    const post = await Post.findById(req.params.id)

    if(!post){
        return next(new ErrorHandler("Post Not Found",404))
    }
    if(post.owner.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("Unauthorized",401))
    }

    post.caption = req.body.caption

    await post.save();

    res.status(200).json({
        success: true,
        message:"Caption Updated Successfully" 
    })
})

export const commentOnPost= catchAsyncError(async(req, res,next)=>{
    
        const post = await Post.findById(req.params.id)

        if(!post){
            return next(new ErrorHandler("Post Not Found",404))
        }

        post.comments.push({
            user: req.user._id,
            comment: req.body.comment
        })

        await post.save()

        res.status(200).json({
            success:true,
            message:"Comment Added"
        })

        
})

export const deleteComment= catchAsyncError(async(req, res,next)=>{
    
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
})