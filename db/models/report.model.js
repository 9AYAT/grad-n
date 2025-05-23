import mongoose, { model, Schema } from "mongoose";

const reportSchema=new Schema({
    image:{
        //type:Object//path
        secure_url:{type:String},
        public_id:{type:String}
    },
    percentage: {
        type: String, 
        required: true
      },
      TumorFound: {
        type: String, 
        required: true
      },
      userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
},{timestamps:true})
export const Report=model('Report',reportSchema)