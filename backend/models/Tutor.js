const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tutorSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    subjects:{
        type:[String],
        require:true
    },
    experiences:{
        type:Number,
        default:0,
    },
    bio:{
        type:String,
    },
},{timestamps:true});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;