const mongoose=require("mongoose")
const Schema=mongoose.Schema

const postSchema= new Schema({
    title:{type:String, required:true},
    location:{type:String, required:true},
    likes :[{type:Schema.Types.ObjectId,unique:true,ref:"users"}],
    description:{type:String, required:true},
    PostImage:{type:String, required:true},
    datetime :{type:Date,required:true},
    user:{type:Schema.Types.ObjectId,ref:"User"}
})

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel