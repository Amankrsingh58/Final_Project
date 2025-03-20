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


const getAllHelpRequest = async (req,res) => {
    try {
        const allHelpRequest = await HelpRequest.find({}).populate("user").exec();
        if(!allHelpRequest|| allHelpRequest.length === 0) return res.status(404).json({error:'cannot fetch data'});

        return res.status(200).json({
            success:true,
            data:allHelpRequest,
            message:"Data fetched successfully"
        });

        
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
};

const markedSolved = async (req,res) => {
    try {
        const { id } = req.params;
        const message = await HelpRequest.findByIdAndUpdate(id,{solved:true},{new:true});
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
          }
      
          res.json(message);
        
    } catch (error) {
        res.status(500).json({message:'cant update solved',error:'server error'});

    }
}

module.exports = {
    HelpRequestHandler,
    getAllHelpRequest,
    markedSolved,
};