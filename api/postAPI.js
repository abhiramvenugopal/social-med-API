const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const postModel=require('../model/post')

router.post("/create", async function(req,res){
    try{
        let data={
            datetime:new Date(),
            user:req.user
        }   
        posts= await postModel.create({...req.body,...data})
        res.status(200).json({
            status:"success",
            posts:posts
        })
    }
    catch(err){
        res.status(500).json({
            status:"failed"
        })
    }
    
})


module.exports=router