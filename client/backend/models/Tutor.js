const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  bio: {
    type: String
  },
  state: {
    type: String,
    default:"Not Provided yet"
  },
  city: {
    type: String,
    default:"Not Provided yet"
  },

  review: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
}, { timestamps: true });

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;