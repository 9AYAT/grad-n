import { Report } from "../../../db/index.js"

export const addReport=async(req,res,next)=>{
       const{ percentage, TumorFound}=req.body
       const reports=new Report({
        percentage,TumorFound,image
       })
       await reports.save()
   res.status(201).json({  message: 'Report added successfully!' ,success:true});
}
