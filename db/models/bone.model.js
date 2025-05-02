import mongoose, { model, Schema } from "mongoose";

const boneSchema=new Schema({
    base64:{
        //type:Object//path
        secure_url:{type:String},
        public_id:{type:String}
    },
    bodyPart: {
        type: String, 
        required: true
      },
      diagnosis: {
        type: String, 
        required: true
      },
      confidence: {
        type: String, 
        required: true
      },
      fractureDegree: {
        type: String, 
        required: true
      },
      explanation: {
        type: String, 
        required: true
      },
      
      userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
},{timestamps:true})
export const Bone=model('Bone',boneSchema)