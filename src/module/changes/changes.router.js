import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { isvalid } from "../../middleware/validtion.js";
import { changePassVal } from "./changes.validation.js";
import { changePassword } from "./changes.controller.js";

const changeRouter=Router()
changeRouter.put('/changePass',isAuthenticated(),isAuthorized(roles.USER),isvalid(changePassVal),asynchandler(changePassword))
export default changeRouter