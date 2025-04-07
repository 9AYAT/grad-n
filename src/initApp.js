import { globalErrorHandling } from "./middleware/asynchandler.js"
import userRouter from "./module/user/user.router.js"
//import { globalErrorHandling } from "./utils/appError.js"
 export const initapp=(app,express)=>{
//parse req
    app.use(express.json())
    //routing
    app.use('/auth',userRouter)
   app.all("",(req,res,next)=>{  return res.json({message:"invalid url"})})
    app.use(globalErrorHandling)
 }
//sr