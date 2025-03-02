const HelpRequest = require("../models/HelpRequest");


//logic
const HelpRequestHandler = async(req,res) =>{
    try {
        const {subject, message} = req.body;

        if(!subject || !message){
            return res.status(400).json({
                error:"All field requir"
            });
        }

        const newHelpRequest = new HelpRequest({
            user: req.user._id,
            role:req.user.role,
            subject,
            message
        });
        console.log(newHelpRequest);
        await newHelpRequest.save();
        res.status(201).json({message:"Submitted successfully"});

    } catch (error) {
        res.status(500).json({error:'server error'});
    }
};

module.exports = {HelpRequestHandler};