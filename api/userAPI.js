const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt =require("jsonwebtoken");
const userModel=require('../model/user')
const postModel=require('../model/post')
const commentModel=require('../model/comments')
const middleware=require('../util/middleware')

router.use("/users/",middleware)

// API for signin with username and password
router.post('/signin',(req,res)=>{
    const {username,password}=req.body
    console.log(req.body)
    if(!username || !password){
        return res.status(422).json({error:"please add username or password"})
    }
    userModel.findOne({  email:username  })
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"user not found"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token =jwt.sign({data:savedUser._id},process.env.JWT_SECRET)
                res.json({status:"success",token:token,user:{name:savedUser.name,email:savedUser.email,followers:savedUser.followers,following:savedUser.following}})
            }
            else{
                return res.status(422).json({error:"password is wrong"})
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

// API for registering a user
router.post("/register",async function(req,res){
    console.log(req.body)
    let reqObject={...req.body}
    console.log(reqObject)
    try {
        bcrypt.hash(reqObject.password, 10,async function(err, hash) {
            if(err){
                res.status(500).json({status:"Encryption failed"})
            }
            reqObject.password=hash
            await userModel.create(reqObject)
            res.status(200).json({
                status:"success",
                message:"register success"
            })
            
        });
    } catch (error) {
        res.status(500).json({status:"failed"})
        console.log("error",error)
        
    }
    
    
})

//API to fetch the latest list of users liking my posts
router.get("/users/like/myposts", async function(req,res){
    try{
        let allUsers=[]
        let users=await postModel.find({user:req.user},{likes:1})
        users.forEach(likeArr => {
            console.log(likeArr.likes)
            allUsers=[...allUsers,...likeArr.likes]
        });
        let userDetails= await userModel.find({_id:{$in:allUsers}},{password:0,__v:0})
        res.status(200).json({
            status:"success",
            users:userDetails
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:"failed"
        })
    }
    
})

// API to fetch the latest list of users liking my comments on any post
router.get("/users/comments/like/myposts", async function(req,res){
    try{
        let allPosts=[]
        let posts=await postModel.find({user:req.user},{_id:1})
        posts.forEach(post => {
            allPosts.push(post._id)
        });
        let allUsers=[]
        let users=await commentModel.find({post:{$in:allPosts}},{likes:1})
        users.forEach(likeArr => {
            console.log(likeArr.likes)
            allUsers=[...allUsers,...likeArr.likes]
        });
        let userDetails= await userModel.find({_id:{$in:allUsers}},{password:0,__v:0})
        res.status(200).json({
            status:"success",
            users:userDetails
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:"failed"
        })
    }
    
})

// API to fetch the latest list of users commenting on my post
router.get("/users/comments/myposts", async function(req,res){
    try{
        let allPosts=[]
        let posts=await postModel.find({user:req.user},{_id:1})
        posts.forEach(post => {
            allPosts.push(post._id)
        });
        var allUsers=[]
        let comments=await commentModel.find({post:{$in:allPosts}},{user:1})
        console.log(comments)
        comments.forEach(comment => {
            allUsers.push(comment.user)
        });
        console.log(allUsers)
        let userDetails= await userModel.find({_id:{$in:allUsers}},{password:0,__v:0})
        res.status(200).json({
            status:"success",
            users:userDetails
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