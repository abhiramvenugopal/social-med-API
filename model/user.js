const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema= new Schema({
    name : {type:String, required:true},
    email : {type:String, required:true,unique:true},
    password :{type :String, required:true},
    followers:{type:Number,required:true,default:0},
    following:{type:Number,required:true,default:0}
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel