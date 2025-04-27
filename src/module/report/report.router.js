import { Router } from "express";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addReport, getAllReport } from "./report.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
import { cloudUpload } from "../../utils/muler-cloud.js";
const reportRouter=Router()
reportRouter.post('/reports',isAuthenticated(),isAuthorized(roles.USER)
,cloudUpload({folder:'report'}).single('image'),asynchandler(addReport))
//get all report
reportRouter.get('/get',isAuthenticated(),isAuthorized(roles.USER),asynchandler(getAllReport))
export default reportRouter