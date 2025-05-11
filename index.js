import path from "path"
import express from "express"
import { connectDb } from "./db/connection.js"
import { initapp } from "./src/initApp.js"
import cors from 'cors';
import dotenv from "dotenv"
import bodyParser from "body-parser";
const app=express()
//app.use(cors({
 // origin: 'http://localhost:4200',
   //credentials: true 
//}));
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://mazenelnosery1.github.io'
  ],
  credentials: true
}));
//app.use(cors({
  //origin: "*", // للسماح بالوصول من أي مكان (Flutter, web)
  //methods: ["GET", "POST", "PUT", "DELETE"],
 // allowedHeaders: ["Content-Type", "Authorization"],
//}));

app.use(bodyParser.json());
dotenv.config({path:path.resolve('./config/.env')})
connectDb()
initapp(app,express)
const port=process.env.port || 3000
app.listen(port,()=>{
    console.log('server is running on ',port)
})