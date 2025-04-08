
import { messages } from "../../utils/constant/messages.js"
import bcrypt from "bcrypt"
import { sendEmail } from "../../utils/email.js"
import { generateToken, verifyToken } from "../../utils/token.js"
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { nanoid } from "nanoid"
import { generateOTP } from "../../utils/otp.js"
export const signup=async(req,res,next)=>{
    //get data from req
    let{name,email,phone,password,DOB}=req.body
    //check data
    const userExist=await User.findOne({$or:[{email},{phone}]})
    if(userExist){
        return next(new AppError(messages.user.alreadyExist,409))
    }
    //hash password
    password=bcrypt.hashSync(password,8)
    const user=new User({
        name,
        email,
        phone,
        password
        ,DOB
    })
const createdUser=await user.save()
if(!createdUser){
    return next (new AppError(messages.user.failToCreate,500))
}
//generate token
const token=generateToken({payload:{email}})
//send mail
await sendEmail({to:email,subject:"verify your account",
    html:`<p>click on link to verify account<a href="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></p>`})
    return res.status(201).json({
        message:messages.user.createsuccessfully,
        success:true,
        data:createdUser
    })}
    export const verifyAccount=async(req,res,next)=>{
        //get data from req
        const{token}=req.params
        const payload=verifyToken({token})
         await User.findOneAndUpdate({email:payload.email,status:"pending"},{status:"verified"},{new:true})
         return res.status(200).json({message:messages.user.verified})
        }
        //login
        export const login=async(req,res,next)=>{
            //get data from req
         const {email,phone,password}=req.body
         //check exist
         const userExist=await User.findOne({$or:[{email},{phone}],status:"verified"})
         if(!userExist){
            return next(new AppError(messages.user.notfound,400))
         }
         const match =bcrypt.compareSync(password,userExist.password)
         if(!match){
            return next(new AppError(messages.user.invalidCredentials,400))
         }
        //generate token
        const token=generateToken({payload:{_id:userExist._id,email}})
        return res.status(200).json({message:"login successfully",success:true,token})
        }
                //forget password
 export const forgetPassword=async(req,res,next)=>{
    //get data from req
    const { email } = req.body 
    const user = await User.findOne({email});
    if (!user) {
    return res.status(404).json({ message: 'No user found with that email' });}
    //if already has email
    if(user.otp &&user.expireDateOtp>Date.now()){
return next(new AppError('u already has otp',400))
    }
    //generate otp
     const otp=generateOTP()
     user.otp = otp; 
     user.expireDateOtp = Date.now() + 3 * 60 * 1000; // OTP valid for 15 minutes
     await user.save();
 //send email
await sendEmail({to:email,subject:"forget password" ,html:`<h1>u request forget password your otp is ${otp} </h1>`});
       return res.status(200).json({ message: 'OTP sent to email' }); }
        //reset password\
 export const resetPassword=async(req,res,next)=>{
   const{otp,newPassword,email}=req.body
   //check email
   const user=await User.findOne({email})
   // Find user by OTP
   //const user = await User.findOne({ otp });
   if(!user){
    return next(new AppError(messages.user.notfound,404))
   }
   if(user.otp!=otp){
    return next(new AppError('invalid otp',401))
   }
   if(user.expireDateOtp<Date.now()){
    const secondOtp=generateOTP()
    user.otp=secondOtp
    user.expireDateOtp=Date.now()+5*60*1000
    await user.save()
    await sendEmail({to:user.email,subject:'resent otp',html:`<h1> your otp is ${secondOtp}</h1>`})
    return res.status(200).json({message:"check your email",success:true})
   }
   ///hash new pass
   const hashedPassword=bcrypt.hashSync(newPassword,8)
  //user.password=hashedPassword
  //user.otp=undefined
 // user.expireDateOtp=undefined
 // await user.save()
  await User.updateOne({email },{password:hashedPassword,$unset:{otp:"",expireDateOtp:""}})
  return res.status(200).json({message:"pass updated successfully",success:true})
 }