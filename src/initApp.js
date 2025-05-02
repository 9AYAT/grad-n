import { globalErrorHandling } from "./middleware/asynchandler.js"
import { boneRouter, changeRouter, contactRouter, doctorRouter, reportRouter, userRouter } from "./module/index.js"


//import { globalErrorHandling } from "./utils/appError.js"
 export const initapp=(app,express)=>{
//parse req
    app.use(express.json())
    //routing
    app.use('/auth',userRouter)
    app.use('/change',changeRouter)
    app.use('/contact',contactRouter)
    app.use('/doctor',doctorRouter)
    app.use('/report',reportRouter)
    app.use('/bone',boneRouter)
   app.all("/",(req,res,next)=>{  return res.json({message:"invalid url"})})
    app.use(globalErrorHandling)
 }
//sr