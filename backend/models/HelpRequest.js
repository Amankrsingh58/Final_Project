const mongoose =  require("mongoose");


const HelpRequestSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        enum:["admin", "student", "tutor"],
        required:true
    },
    subject: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    reatedAt:{
        type:Date,
        default:Date.now
    },
});

const HelpRequest = mongoose.model('HelpRequest', HelpRequestSchema);
module.exports = HelpRequest;
