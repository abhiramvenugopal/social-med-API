const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const postModel=require('../model/post')
const commentModel=require('../model/comments')
const middleware=require('../util/middleware')

router.use("/",middleware)

//API for creating new post 

router.post("/create", async function(req,res){
    try{
        let data={
            datetime:new Date(),
            user:req.user
        }   
        posts= await postModel.create({...req.body,...data}) // creating NEW post using the data get from request body
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

// API for like a Post

router.patch("/like/:postId", async function(req,res){
    try{
        
        posts= await postModel.updateOne({_id:req.params.postId},{  $addToSet: { likes:req.user} }) // adding liked user id to array for recording all likes
        res.status(200).json({
            status:"success",
        })
    }
    catch(err){
        res.status(500).json({
            status:"failed"
        })
    }
    
})

//API for adding an comment to a post

router.post("/comment/:postId", async function(req,res){
    try{
        commentObject={
            comment:req.body.comment,
            post:req.params.postId,
            user:req.user,
            likes:[]
        }
        comment= await commentModel.create({...commentObject}) // creaing an comment entry  with commented post id and user id  
        res.status(200).json({
            status:"success",
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