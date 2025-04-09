import joi from "joi";
import { generalfield } from "../../middleware/validtion.js";

export const changePassVal=joi.object({
    oldPassword:generalfield.password.required(),
    newPassword:generalfield.password.required()
})