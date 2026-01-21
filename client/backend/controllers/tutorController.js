const Tutor = require("../models/Tutor")
const User = require("../models/User")
const mongoose = require("mongoose")

exports.getAllTutor = async(req,res) => {
    try {
        const allTutor = await Tutor.find({}).populate("userId");

        if(!allTutor) return res.status(400).json({
            success:false,
            message:"cannot fetched tutors"
        })

        return res.status(200).json({
            success:true,
            message:'All data fetched successfully',
            allTutor,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while fetching all tutor",
            error:error.message
        })
    }
};

exports.getTutorById = async (req,res) => {
    try {
        const {id} = req.params;
        // const tutorId = mongoose.Types.ObjectId(id);

        const tutor = await Tutor.findById(id).populate("userId")

        if(!tutor)  return res.status(400).json({
            success:false,
            message:"Tutor not find",
            error:error.message
        });

        return res.status(200).json({
            success:true,
            message:"successfully fetched all tutor",
            data : tutor,
        })

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while fetching  tutor",
            error:error.message
        })
    }
};


exports.deleteTutor = async (req,res) => {    
    try{
        const tutorId = req.body;
        console.log(tutorId)

        const tutor = await Tutor.findById(tutorId);
        if (!tutor) {
            return res.status(404).send('Tutor not found');
          }

        const userId = tutor.userId;

        await Tutor.findByIdAndDelete(tutorId);
        const deletedUser = await User.findByIdAndDelete(userId);


        if (!deletedUser) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send('User deleted successfully');
        } catch (error) {
          res.status(500).send('Error deleting user: ' + error.message);
        
    }
}