const User = require("../models/User");
const Tutor = require("../models/Tutor");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const asyncHandler = require('express-async-handler');


 exports.auth= asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            return res.status(401).json({success:false,message:'Unauthorized request'});
        }
        console.log(token);
        console.log(process.env.ACCESS_TOKEN_SECRETE);
        const decodeToken = jwt.verify(token, "amansingh")
        console.log("yhs tsk");
    
       const newuser =  await User.findById(decodeToken._id).select("-password-refreshToken")
    
       if(!newuser) return res.status(401).json({success:false,message:'Invalid Access token '});
	   console.log(newuser);
    
       req.user = newuser;
       next();
    
    } catch (error) {
        return res.status(401).json({success:false,message:error.message || 'access token verification faield'});

    }
});

exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await Tutor.findOne({ email: req.user.email });

		if (userDetails.role !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isTutor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.role !== "Tutor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
        return res.status(401).json({
            success: true,
            message: "This is a Protected Route for Instructor and you are",
        });
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

