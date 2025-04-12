import { model } from "mongoose"
export const AddDoctor=async(req,res,next)=>{
    const{name,phone,specialist,location,price}=req.body
    const doctor=new model({
        name,
        phone,
        specialist,
        location,
        price
    })
    await doctor.save()
    return res.staus(201).json({messsage:'doctor added successfully',success:true})
}