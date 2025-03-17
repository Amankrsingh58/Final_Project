const User = require("../models/User");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");
const asyncHandler = require('express-async-handler');

const getUserData = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'Tutor') {
            const tutorData = await Tutor.findOne({ userId: user._id }).populate('userId');
            if (!tutorData) {
                return res.status(404).json({ message: 'Tutor data not found' });
            }
            return res.status(200).json({ profile: tutorData });
        } else if (user.role === 'Student') {
            const studentData = await Student.findOne({ userId: user._id }).populate('userId');
            if (!studentData) {
                return res.status(404).json({ message: 'Student data not found' });
            }
            return res.status(200).json({ profile: studentData });
        } else {
            return res.status(400).json({ message: 'Invalid user role' });
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: 'Server error' });
    }
});

    const updateProfile = async (req,res) => {
        try {
            const {id} = req.params;
            const ID = req.user._id;
            const {profile} = req.body;
            console.log("alrights",id)

            const user = await User.findById(ID);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if(user.role === 'Tutor'){
                const updatedTutor = await Tutor.findByIdAndUpdate(id, { $set: profile },{new:true});
                if (!updatedTutor) {
                    return res.status(404).json({ message: 'Tutor not found' });
                  }
                  return res.status(200).json({ message: 'Tutor updated successfully', data: updatedTutor });
            }
            else if(user.role === 'Student'){
                const updatedStudent = await Student.findByIdAndUpdate(id, { $set: profile },{new:true});

                if (!updatedStudent) {
                    return res.status(404).json({ message: 'Student not found' });
                  }
                  return res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });

        }
    }

module.exports = { getUserData, updateProfile };
