import { Report } from "../../../db/index.js"
import cloudinary from "../../utils/cloud.js"

export const addReport=async(req,res,next)=>{
       const{ percentage, TumorFound}=req.body
       const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,
        {folder:'hti/report'})
       const reports=new Report({
        percentage,TumorFound,image
       })
       const report=await reports.save()
       if(!report){
        // rollback delete image
         req.failImage={secure_url,public_id}
        return next(new AppError('image not addded',500))
     }
   res.status(201).json({  message: 'Report added successfully!' ,success:true});
}
