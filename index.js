const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors")
const bodyParser = require('body-parser')
const userAPI=require("./api/userAPI")




const dotenv = require('dotenv');                           
dotenv.config();
mongoose.connect(process.env.DB)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/v1/user",userAPI); 


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("server started at port : " +PORT)
})
