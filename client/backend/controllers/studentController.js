const Student = require("../models/Student")
const mongoose = require("mongoose")

exports.getAllStudent = async(req,res) => {
    try {
        const allStudent = await Student.find({}).populate("userId");

        if(!allStudent) return res.status(400).json({
            success:false,
            message:"cannot fetched students"
        })

        return res.status(200).json({
            success:true,
            message:'All data fetched successfully',
            allStudent,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while fetching all student",
            error:error.message
        })
    }
};

exports.getStudentById = async (req,res) => {
    try {
        const {id} = req.params;
        // const studentId = mongoose.Types.ObjectId(id);

        const student = await Student.findById(id).populate("userId")

        if(!student)  return res.status(400).json({
            success:false,
            message:"Student not find",
            error:error.message
        });

        return res.status(200).json({
            success:true,
            message:"successfully fetched all student",
            data : student,
        })

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while fetching  student",
            error:error.message
        })
    }
};