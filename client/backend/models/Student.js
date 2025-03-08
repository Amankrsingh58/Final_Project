const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    grade:{
        type:Number,
        require:true,

    },
    subjectInterested:{
        type:[String],
        require:true
    },
    
},{timestamps:true});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;