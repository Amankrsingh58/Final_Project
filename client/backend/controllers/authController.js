
const User = require("../models/User");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const bcrypt = require("bcrypt")



//register business logic
const registerUser = async (req, res) => {
    try {
        const { userName, email, password, confirmpassword, role, subjects, experience, grade, state, city, subjectInterested } = req.body;
        console.log("req ka body =>", req.body);
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
        const user = new User({ userName, email, password, role });
        await user.save();
        console.log("alright");

        //save tutor/student entry based on role
        if (role === 'Tutor') {
            const tutor = new Tutor({
                userId: user._id,
                subjects,
                experience,
                bio: req.body.bio,
                state,
                city,
            });
            await tutor.save();
        } else if (role === 'Student') {
            const student = new Student({
                userId: user._id,
                grade,
                subjectInterested,
                state,
                city,
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
        const refreshToken = await user.generateRefreshToken();
        console.log("User not found", user);
        user.refreshToken = refreshToken;
        await user.save();
        console.log(refreshToken);

        user.password = undefined;
        // Set cookies with the tokens
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000,
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                user: user,
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
const logoutUser = asyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } },
            { new: true });

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({
            sucess: true,
            message: 'User Logged Out Successfully'
        });

    } catch (error) {
        console.error("Logout Error: ", error);
        return res.status(500).json({
            success: false,
            message: 'Error while logging out',
            error: error.message
        });
    }
});

const verifyToken = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const decodeToken = jwt.verify(token, "amansingh");

        if (!decodeToken) return res.status(401).json({
            success: false, message: 'token expire',
            error: error.message
        });
        const user = await User.findById(decodeToken._id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Token is valid', user });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error whil veryfing token',

            error: error.message
        });
    }
});

const changePassword = asyncHandler(async (req, res) => {
    try {
        const { currentPassword, password, confirmpassword } = req.body;
        const  userId  = req.user._id;
        console.log("user printing",userId)
        //validate data
        if (password !== confirmpassword) return res.status(400).send('Current password is incorrect');
        const userData = await User.findById(userId);
        if (!userData) return res.status(404).json({success:false, message:'User not found'});

        //password match
        const isMatch = await bcrypt.compare(currentPassword, userData.password);
        if (!isMatch) return res.status(400).send('Passwords do not match.');

        //hash pass
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword) return res.status(400).send("Password Can't Hashed");

        //update
        userData.password = password;
        await userData.save();

        //return response
        return res.send('Password changed successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
   
})



module.exports = { registerUser, loginUser, logoutUser, verifyToken, changePassword };
