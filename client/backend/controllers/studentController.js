const Student = require("../models/Student");

exports.getAllStudent = async(req,res) => {
    try {
        const allStudent = await Student.find({});

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