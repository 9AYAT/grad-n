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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // بيشاور على جدول الUsers
         // كل تقرير مرتبط بمستخدم
      }
},{timestamps:true})
export const Report=model('Report',reportSchema)