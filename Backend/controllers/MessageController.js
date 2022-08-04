import catchAsyncError from "../middleware/catchAsyncError.js";
import Message from '../models/Message.js'
import ErrorHandler from '../utils/errorHandler.js'
import User from "../models/User.js";
import Chat from '../models/Chat.js'

export const sendMessage = catchAsyncError(async(req,res,next)=>{
    const {content,chat} = req.body

    const newMessage = {
        sender:req.user._id,
        content:content,
        chat:chat
    }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender","name avatar userName")
        message = await message.populate('chat')
        message = await User.populate(message,{
            path:"chat.users",
            select:'name avatar userName'
        })

        await Chat.findByIdAndUpdate(chat,{
            latestMessage:message
        })

        res.status(200).json(message)

    }catch(err){
        res.status(400)
        throw new ErrorHandler(err.message)
    }
})

export const getAllMessages = catchAsyncError(async(req,res,next)=>{
    
    const messages = await Message.find({chat:req.params.chatId}).populate("sender","name avatar userName").populate("chat")

    res.status(200).json(messages)
})