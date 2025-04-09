import bcrypt from 'bcrypt'
import { AppError } from '../../utils/appError.js'
import { User } from '../../../db/index.js'
import { messages } from '../../utils/constant/messages.js'
export const changePassword=async(req,response,next)=>{
    //get data 
    const {oldPassword,newPassword}=req.body
    const userId=req.authUser._id
    //check user password
    const match=bcrypt.compareSync(oldPassword,req.authUser.password)
   if(!match){
    return next(new AppError('Invalid credentials'))
   }
   if (oldPassword === newPassword) {
    return next(new AppError('New password must be different', 400));
  }
  //hash password
 const hashedPassword=bcrypt.hashSync(newPassword,8)
 //update
 await User.updateOne({_id:userId},{password:hashedPassword})
 //send res
 return res.status(200).json({message:messages.user.updatedsuccessfully,success:true})
     
}