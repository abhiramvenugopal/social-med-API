const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const postModel=require('../model/post')
const commentModel=require('../model/comments')
const middleware=require('../util/middleware')

router.use("/",middleware)

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


router.patch("/like/:postId", async function(req,res){
    try{
        
        posts= await postModel.updateOne({_id:req.params.postId},{  $addToSet: { likes:req.user} })
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

router.post("/comment/:postId", async function(req,res){
    try{
        commentObject={
            comment:req.body.comment,
            post:req.params.postId,
            user:req.user,
            likes:[]
        }
        comment= await commentModel.create({...commentObject})
        res.status(200).json({
            status:"success",
            comment:comment
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:"failed"
        })
    }
    
})


router.post("/users/like/:postId", async function(req,res){
    try{
        commentObject={
            comment:req.body.comment,
            post:req.params.postId,
            user:req.user,
            likes:[]
        }
        comment= await commentModel.create({...commentObject})
        res.status(200).json({
            status:"success",
            comment:comment
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:"failed"
        })
    }
    
})

module.exports=router