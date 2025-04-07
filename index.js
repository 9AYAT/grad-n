import path from "path"
import express from "express"
import { connectDb } from "./db/connection.js"
import { initapp } from "./src/initApp.js"
import cors from 'cors';
import dotenv from "dotenv"
const app=express()
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true 
}));
dotenv.config({path:path.resolve('./config/.env')})
connectDb()
initapp(app,express)
const port=process.env.port || 3000
app.listen(port,()=>{
    console.log('server is running on ',port)
})