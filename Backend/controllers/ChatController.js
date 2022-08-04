import catchAsyncError from "../middleware/catchAsyncError.js";
import Chat from '../models/Chat.js'
import ErrorHandler from '../utils/errorHandler.js'
import User from "../models/User.js";


export const accessChat = catchAsyncError(async(req, res, next)=>{
    const {userId} = req.body;

    if(!userId){
        return next(new ErrorHandler("UserID not exists",404));
    }

    var isChat = await Chat.find({
        $and:[
            {users: { $elemMatch:{ $eq: req.user._id}}},
            {users : { $elemMatch:{ $eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:'latestMessage.sender',
        select:'name avatar userName'
    })

    if(isChat.length>0){
       return res.status(200).json(isChat)
       
    }else{
        var chatData ={
            chatName:'sender',
            users:[req.user._id,userId]
        }
        
            const createdChat = await Chat.create(chatData)

            const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users", "-password")

            res.status(200).json(fullChat)

    }
})


export const fetchChats = catchAsyncError(async(req,res,next)=>{
    try {

        Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("latestMessage").sort({updatedAt:-1}).then(
            async(result)=>{
                result= await User.populate(result,{
                    path:'latestMessage.sender',
                    select:'name avatar userName'
                })
                res.status(200).json(result)
            }
        )
        
    } catch (error) {

        return next(new ErrorHandler(error,500))
        
    }
})