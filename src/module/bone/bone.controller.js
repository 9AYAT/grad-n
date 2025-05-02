//add report fracture
//export const addBoneReport=async(req,res,next)=>    const{ bodyPart,diagnosis,confidence,fractureDegree,explanation}=req.bod      }
import express from 'express';
// your Cloudinary config
 // your Mongoose model
import fs from 'fs';
import cloudinary from '../../utils/cloud.js';
import { Bone } from '../../../db/index.js';

export const addBoneReport=async(req,res,next)=>{
        const userId = req.authUser._id;
    const {
      //image, // base64 string
      base64,
      bodyPart,
      diagnosis,
      confidence,
      fractureDegree,
      explanation,
    } = req.body;

    if (!base64) {
      return res.status(400).json({ error: 'Invalid or missing image' });
    }
    const cleanBase64 = base64.replace(/(\r\n|\n|\r)/gm, "").trim();
    const base64WithPrefix = `data:image/png;base64,${cleanBase64}`;
    // ✅ Upload to Cloudinary as PNG
    const uploadResult = await cloudinary.uploader.upload(base64WithPrefix, {
      folder: 'bones',
      format: 'png', // force conversion to PNG
    });

    // ✅ Save to MongoDB
    const bone = new Bone({
      base64: {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      bodyPart,
      diagnosis,
      confidence,
      fractureDegree,
      explanation,
      userId
    });
   const boneComplete= await bone.save();
if(!boneComplete){
       return res.status(500).json({ error: 'Failed to process image' });
}
    res.status(201).json({ message: 'Image uploaded and bone record created', data: bone });
  } 
