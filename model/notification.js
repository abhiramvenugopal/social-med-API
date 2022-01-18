const mongoose=require("mongoose")
const Schema=mongoose.Schema

const notificationSchema= new Schema({
    message:{type:String, required:true},
    sourceUser:{type:Schema.Types.ObjectId,ref:"users"},
    targetUser:{type:Schema.Types.ObjectId,ref:"users"},
    status:{type:String,enum : ['READ','UNREAD'], required:true,}
})

const notificationModel=mongoose.model("notifications",notificationSchema)

module.exports=notificationModel