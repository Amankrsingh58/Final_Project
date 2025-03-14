
const User = require("../models/User");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const asyncHandler = require('express-async-handler');
require('dotenv').config();



  //register business logic
const registerUser = async(req,res) => {
    try {
        const {userName, email, password, confirmpassword, role, subjects, experience, grade, subjectInterested} = req.body;
        
        //validate user data input
        if (!userName || !email || !password || password !== confirmpassword) {
            return res.status(400).json({ message: 'Please enter required details' });
        }
        
        if (role === 'Tutor') {
            if (!subjects || subjects.length === 0) {
                return res.status(400).json({ message: 'Please enter subjects for tutor' });
            }
        } else if (role === 'Student') {
            if (!grade || !subjectInterested || subjectInterested.length === 0) {
                return res.status(400).json({ message: 'Please enter grade and subjects for student' });
            }
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        
        //hash password
        //save user entry
        const user = new User({userName,email,password,role});
        await user.save();
        console.log("alright");

        //save tutor/student entry based on role
        if(role === 'Tutor'){
            const tutor = new Tutor({
                userId: user._id,
                subjects,
                experience,
                bio:req.body.bio // If included
            });
            await tutor.save();
        } else if (role === 'Student') {
            const student = new Student({
                userId: user._id,
                grade,
                subjectInterested,
            });
            await student.save();
        }

        //remove password and refresh token field from response
        //check for user creaion

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error: ", error);  
        return res.status(500).json({ error: 'Registration failed' });
    }
};

  //Log In handler
  const loginUser = asyncHandler(async (req, res) => {
    // Extract email and password from request body
   try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found',
        });
    }
    
    // Password check
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        console.log("Password does not match");
        return res.status(404).json({
            status: false,
            message: 'Password does not match',
        });
    }
    
    // Generate access and refresh tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken =await user.generateRefreshToken();
    console.log("User not found",user);
    user.refreshToken = refreshToken;
    await user.save();
    console.log(refreshToken);
    
    user.password = undefined;
    // Set cookies with the tokens
    const options = {
        httpOnly: true,
    secure: false,  
    sameSite: "Lax",
    };
    
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            user:user,
            message: 'User logged in successfully',
        });
   } catch (error) {
    return res.status(404).json({
        status: false,
        message: 'error while login',
    });
   }
});

 //Logout user
 const logoutUser = asyncHandler(async(req,res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        await User.findByIdAndUpdate( req.user._id,{$set:{refreshToken:undefined}},
                                             {new:true});

        const options = {
            httpOnly:true,
            secure:true
        }

        return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({
            sucess:true,
            message:'User Logged Out Successfully'
        });
       
    } catch (error) {
        console.error("Logout Error: ", error);
        return res.status(500).json({
            success: false,
            message: 'Error while logging out',
            error: error.message
        });
    }
 }); //last paranthesis

module.exports = { registerUser, loginUser, logoutUser };
