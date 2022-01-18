const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentSchema= new Schema({
    comment:{type:String, required:true},
    likes :[Schema.Types.ObjectId],
    post:{type:Schema.Types.ObjectId,ref:"posts"}
})

const commentModel=mongoose.model("comments",commentSchema)

module.exports=commentModel