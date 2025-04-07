
import { model, Schema } from "mongoose";
import { roles } from "../../src/utils/constant/enum.js";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    DOB:{
        type:String,
        default:Date.now()
    },
    role:{
        type:String,
        enum:Object.values(roles),
        default:roles.USER
    },
    otp:Number,
    expireDateOtp:Date,
    status: {
    type:String,
    enum:['pending','verified','blocked'],
    default:'pending'
},
newPassword:{type:String}
},{timestamps:true})
export const User=model("User",userSchema)