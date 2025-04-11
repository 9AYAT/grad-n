import { Contact } from "../../../db/index.js"
export const ContactUs=async(req,res,next)=>{
   const{ firstName, lastName,  phone, email,subject , message}=req.body
   const messages=new Contact({
    firstName, lastName,  phone, email,subject , message
   })
   await messages.save()
   res.status(201).json({  message: 'Message sent successfully!' ,success:true});
}