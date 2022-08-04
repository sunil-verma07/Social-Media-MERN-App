import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path'
import app from "./App.js";
import express from 'express'
dotenv.config({path:'./config/config.env'})

//deployment configuration

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
  
}else{
   app.get('/',(req,res)=>{
    res.send("api is running")
   })
}

 mongoose.connect(process.env.DB,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Database Connected Successfully")
}).catch((err)=>{
    console.log(err)
})
const port =process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})