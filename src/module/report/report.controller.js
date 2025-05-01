import { Report } from "../../../db/index.js"
import cloudinary from "../../utils/cloud.js"
import { messages } from "../../utils/constant/messages.js";

export const addReport=async(req,res,next)=>{
    const userId = req.authUser._id;
       const{ percentage, TumorFound,base64Image}=req.body
       if (!base64Image) {
        return res.status(400).json({ message: "photo is requred"});
      }
      let formattedBase64 = base64Image.trim();
      if (!formattedBase64.startsWith("data:image")) {
        formattedBase64 = `data:image/png;base64,${formattedBase64}`;
      }
       const{secure_url,public_id}=await cloudinary.uploader.upload(formattedBase64,
        {folder:'hti/report'})
       const reports=new Report({
        percentage,TumorFound,
        image:{secure_url,public_id},
        userId
       })
       const report=await reports.save()
       if(!report){
        // rollback delete image
         req.failImage={secure_url,public_id}
        return next(new AppError('image not addded',500))
     }
   res.status(201).json({  message: 'Report added successfully!' ,success:true});
}
//get
export const getAllReport=async(req,res,next)=>{
    const userId = req.authUser._id;
    const reports = await Report.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
}
