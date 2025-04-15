import joi from 'joi'
import { generalfield } from '../../middleware/validtion.js'
export const signupVal=joi.object({
name:generalfield.name.required(),
email:generalfield.email.required(),
phone:generalfield.phone.required(),
  password:generalfield.password.required(),
  cPassword:generalfield.cPassword.required(),
  DOB:generalfield.DOB.required()
})
export const loginVal=joi.object({
  phone:generalfield.phone.when('email',{
    is:joi.exist(),
    then:joi.optional(),
    otherwise:joi.required()
  }),
  email:generalfield.email,
  password:generalfield.password.required()
})
//forget pasword
export const forgetpassVal=joi.object({
  // otp:generalFields.string
   email:generalfield.email.required(),})
   //reset password
   export const resetVal=joi.object({
    newPassword:generalfield.password.required(),
    otp:generalfield.name.required(),
    email:generalfield.email.required()
   })
   export const UpdateMyProfileVal=joi.object({
    email:generalfield.email,
  name:generalfield.name,
  DOB:generalfield.DOB,
  phone:generalfield.phone
   })