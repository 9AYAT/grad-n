import { AppError } from "../utils/appError.js"
//async
export const asynchandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            return next(new AppError(err.message,err.statusCode))
        })
    }
}
//global
export const globalErrorHandling=async(err,req,res,next)=>{
    return res.status(err.statusCode||500).json(
        {message:err.message,success:false})
}