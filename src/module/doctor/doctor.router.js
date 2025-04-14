import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { AddDoctor, GetAllDoctor } from "./doctor.controller.js";
const doctorRouter=Router()
//add doctor
doctorRouter.post('/add',isAuthenticated(),isAuthorized(roles.USER),asynchandler(AddDoctor))
doctorRouter.get("/get",isAuthenticated(),isAuthorized(roles.USER),asynchandler(GetAllDoctor))
export default doctorRouter