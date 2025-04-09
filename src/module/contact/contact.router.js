import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authrization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { ContactUs } from "./contact.controller.js";
const contactRouter=Router()
contactRouter.post('/contactUs',isAuthenticated(),isAuthorized(roles.USER),asynchandler(ContactUs))
export default contactRouter