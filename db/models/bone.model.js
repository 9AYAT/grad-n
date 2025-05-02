import mongoose, { model, Schema } from "mongoose";

const boneSchema=new Schema({
  HeatmapImageBase64:{
        //type:Object//path
        secure_url:{type:String},
        public_id:{type:String}
    },
    BodyPart: {
        type: String, 
        required: true
      },
      Diagnosis: {
        type: String, 
        required: true
      },
      Confidence: {
        type: String, 
        required: true
      },
      Degree: {
        type: String, 
        required: true
      },
      Explanation: {
        type: String, 
        required: true
      },
      
      userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
},{timestamps:true})
export const Bone=model('Bone',boneSchema)