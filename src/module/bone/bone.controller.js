//add report fracture
//export const addBoneReport=async(req,res,next)=>    const{ bodyPart,diagnosis,confidence,fractureDegree,explanation}=req.bod      }
import express from 'express';
// your Cloudinary config
 // your Mongoose model
import fs from 'fs';
import cloudinary from '../../utils/cloud.js';
import { Bone } from '../../../db/index.js';
import { report } from 'process';

export const addBoneReport=async(req,res,next)=>{
        const userId = req.authUser._id;
    const {
      //image, // base64 string
      HeatmapImageBase64,
      BodyPart,
      Diagnosis,
      Confidence,
      Degree,
      Explanation,
    } = req.body;
    if (!HeatmapImageBase64) {
      return res.status(400).json({ message: 'Invalid or missing image' });
    }
    const cleanBase64 = HeatmapImageBase64.replace(/(\r\n|\n|\r)/gm, "").trim();
    const base64WithPrefix = `data:image/png;base64,${cleanBase64}`;
    // ✅ Upload to Cloudinary as PNG
    const uploadResult = await cloudinary.uploader.upload(base64WithPrefix, {
      folder: 'hti/bones',
      format: 'png', // force conversion to PNG
    });

    // ✅ Save to MongoDB
    const bone = new Bone({
        HeatmapImageBase64: {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      BodyPart,
      Diagnosis,
      Confidence,
      Degree,
      Explanation,
      userId
    });
   const boneComplete= await bone.save();
if(!boneComplete){
        req.failImage={secure_url,public_id}
        return next(new AppError('image not addded',500))
}
    res.status(201).json({ message: 'Image uploaded and bone record created', data: boneComplete });
}
//get allbones 
export const getAllBones=async(req,res,next)=>{
    const userId = req.authUser._id;
    const reportBones = await Bone.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reportBones.length,
      data: reportBones,
    });
}