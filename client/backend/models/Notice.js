const mongoose =  require("mongoose");

const NoticeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    subject:{
        type:String,
    },
    message:{
        type:String
    }
});


const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;