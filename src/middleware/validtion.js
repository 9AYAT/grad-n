import joi from "joi"
import { AppError } from "../utils/appError.js"

export const generalfield={
name:joi.string(),
//DOB:joi.string().pattern(new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$')),
DOB: joi.string().pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/),
email:joi.string().email(),
password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)),
cPassword:joi.string().valid(joi.ref('password')),
phone:joi.string().pattern(new RegExp(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/))
}
export const isvalid=(schema)=>{
    return(req,res,next)=>{
        let data={...req.body,...req.params,...req.query}
       const{error}= schema.validate(data,{abortEarly:false})
        if(error){  //error                                      
            const errArr=[]                  
            error.details.forEach((err) => {errArr.push(err.message)
            });
            return next(new AppError(errArr,400))
        }
        next()
    }
}