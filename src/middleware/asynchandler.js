import { AppError } from "../utils/appError.js"
import { deleteCloudImage } from "../utils/cloud.js"
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
    if(req.failImage){
        await  deleteCloudImage(req.failImage.public_id)
     }
    return res.status(err.statusCode||500).json(
        {message:err.message,success:false})
}