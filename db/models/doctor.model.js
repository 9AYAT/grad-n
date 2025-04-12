import { model, Schema } from "mongoose";

const doctorSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true
    },
    specialist:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price: 
    { type: Number, required: true },


},{timestamps:true})
//model
export const Doctor=model('Doctor',doctorSchema)