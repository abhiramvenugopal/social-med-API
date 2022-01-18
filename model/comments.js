const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentSchema= new Schema({
    comment:{type:String, required:true},
    likes :[{type:Schema.Types.ObjectId,unique:true,ref:"users"}],
    post:{type:Schema.Types.ObjectId,ref:"posts",required:true},
    user:{type:Schema.Types.ObjectId,ref:"users",required:true}
})

const commentModel=mongoose.model("comments",commentSchema)

module.exports=commentModel