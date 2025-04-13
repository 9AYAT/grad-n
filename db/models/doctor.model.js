import { model, Schema } from "mongoose";

const doctorSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    specialty:{type:String,required:true},
    phone:{
        type:String,
        required:true
    },
    specialist:{
        type:[String],
        required:true
    },
    location:{
        city: {
          type: String
        },
        address: {
          type: String
        }
      },
    price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: "EGP" }
  }
},{timestamps:true})
//model
export const Doctor=model('Doctor',doctorSchema)