const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const asyncHandler = require('express-async-handler');


 const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    
        if(!token){
            return res.status(401).json({success:false,message:'Unauthorized request'});
        }
        console.log(process.env.ACCESS_TOKEN_SECRETE);
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE)
    
       const user =  await User.findById(decodeToken._id).select("-password-refreshToken")
    
       if(!user) return res.status(401).json({success:false,message:'Invalid Access token '});
    
       req.user = user;
       next();
    
    } catch (error) {
        return res.status(401).json({success:false,message:error.message || 'access token verification faield'});

    }
});

module.exports = {verifyJWT};