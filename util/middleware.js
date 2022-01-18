const jwt =require("jsonwebtoken");
const userModel=require("../model/user")

function middleware(req,res,next){
    console.log("middleware")
    console.log(req.headers)
    console.log(process.env.JWT_SECRET)
    let token=req.headers.authorization?.split("bearer ")[1]
    if(!token){
        res.status(401).json({
            status:"failed",
            message:"Not Authenticated",
        })
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET,async function(err, decoded) {
        if(err){
            res.status(401).json({
                status:"failed",
                message:"Not Authenticated",
            })
            return;
        }
        if(decoded){
            const user=await userModel.findOne({_id:decoded.data})
            if(user){
                req.user=user._id
                next()
            }
            else{
                res.status(401).json({
                    status:"failed",
                    message: "Invalid Token"
                })
            }
        }
        
      });   

}
module.exports=middleware