import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
import { cloudUpload } from "../../utils/muler-cloud.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addBoneReport, getAllBones } from "./bone.controller.js";

const boneRouter=Router()
boneRouter.post('/bones',isAuthenticated(),isAuthorized(roles.USER),
cloudUpload({folder:'bones'}).single('HeatmapImageBase64'),asynchandler(addBoneReport))
//GET 
boneRouter.get('/reportbone',isAuthenticated(),isAuthorized(roles.USER),asynchandler(getAllBones))
export default boneRouter