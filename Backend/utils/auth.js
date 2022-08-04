import User from '../Models/UserModel.js';
import jwt from 'jsonwebtoken'
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from './errorHandler.js';

export const isAuthenticated =catchAsyncError(async(req, res, next)=>{
    let {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("You are not authenticated",404))
    }

    const decodeToken = jwt.decode(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodeToken._id);

    next()

})