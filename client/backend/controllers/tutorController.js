const Tutor = require("../models/Tutor")

exports.getAllTutor = async(req,res) => {
    try {
        const allTutor = await Tutor.find({});

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