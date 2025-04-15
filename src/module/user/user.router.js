import { Router } from "express";
import { isvalid } from "../../middleware/validtion.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { forgetpassVal, loginVal,resetVal,signupVal } from "./user.validation.js";
import { forgetPassword, getMyProfile, login, resetPassword, signup, verifyAccount } from "./user.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
const userRouter=Router()
userRouter.post('/signups',isvalid(signupVal),asynchandler(signup))
userRouter.get('/verify/:token',asynchandler(verifyAccount))
userRouter.post('/login',isvalid(loginVal),asynchandler(login))
userRouter.post('/forget',isvalid(forgetpassVal),asynchandler(forgetPassword))
userRouter.put('/reset',isvalid(resetVal),asynchandler(resetPassword))
userRouter.get('/getMyProfile',isAuthenticated(),isAuthorized(roles.USER),asynchandler(getMyProfile))
export default userRouter