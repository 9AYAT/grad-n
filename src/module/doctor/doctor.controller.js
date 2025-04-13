import { Doctor } from "../../../db/index.js"
export const AddDoctor=async(req,res,next)=>{
    const{name,phone,specialist,location,price,specialty}=req.body
    const doctor=new Doctor({
        name,
        phone,
        specialist,
        location,
        price,
        specialty
    })
    await doctor.save()
    return res.status(201).json({messsage:'doctor added successfully',success:true})
}