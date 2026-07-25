const userModel =require("../models/user.model.js")
const jwt=require("jsonwebtoken")

/**
 *-  Register controller
 *- POST api/auth/register
 * */ 

async function UserRegisterController(req,res){
   const {email,password,name}=req.body

   const IsExist = await userModel.findOne({
    email:email
   })

   if(IsExist){
    return res.status(422).json({
        message:"user already exist with email",
        status:"failed"
    })
   }

   const user=await userModel.create({
    email,password,name
   })
   const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

  res.cookie("token",token)

  res.status(201).json({
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },
    token

  })
}

module.exports={
    UserRegisterController
}