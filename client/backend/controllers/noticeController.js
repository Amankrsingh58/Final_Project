const Notice = require("../models/Notice");
const Student = require("../models/Student")
const Tutor = require("../models/Tutor")
const asyncHandler = require('express-async-handler');


const sendNotice = asyncHandler(async(req,res) => {
    try {
        const {id, subject, message, role} = req.body;

        if(!id || !subject || !message || !role) return res.status(404).json({message:'Required Data not found'});

        if(role === "Tutor"){

            const tutor = await Tutor.findById(id);
            
            if(!tutor) return res.status(404).json({message:'Data not found'});
    
            const noticeData = new Notice({user:tutor.userId, subject, message});
            const saveNotice = await noticeData.save();
    
            if(!saveNotice) return res.status(500).json({message:'Cannot send Notice'});
    
            return res.status(200).json({success:true, message:"Notice Sent Successfully"});
        }
        else if(role === "Student"){

            const student = await Student.findById(id);
            
            if(!student) return res.status(404).json({message:'Data not found'});
    
            const noticeData = new Notice({user:student.userId, subject, message});
            const saveNotice = await noticeData.save();
    
            if(!saveNotice) return res.status(500).json({message:'Cannot send Notice'});
    
            return res.status(200).json({success:true, message:"Notice Sent Successfully"});
        }
        else{
            return res.status(404).json({success:false, message:"Role not in List"});
        }
    } catch (error) {
        return res.status(500).json({message:'Cannot send Notice',error:error.message});
    }
});

const getAllNotices = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params; 

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const notices = await Notice.find({ user: userId });

        if (!notices || notices.length === 0) {
            return res.status(404).json({ message: "No notices found for this user" });
        }

        return res.status(200).json({ success: true, data: notices });
    } catch (error) {
        return res.status(500).json({ message: "Cannot fetch notices", error: error.message });
    }
});

module.exports = { sendNotice, getAllNotices}