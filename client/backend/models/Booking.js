const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    bookerRole: {
        type: String,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'cancelled', 'accepted'],
        default:'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BookingSchema.pre('save', async function (next) {
    if (!this.isModified("bookerRole") && this.isModified("bookingStatus") && !this.isModified("studentId") &&
    !this.isModified("tutorId") && !this.isModified("tutorId")) return next();

    const booking = this;
  
    try {
      const existingBooking = await Booking.findOne({
        tutorId: booking.tutorId,
        studentId: booking.studentId,
        bookingStatus: { $ne: 'cancelled' }, 
      });
  
      if (existingBooking) {
        return next(new Error('This booking already exists.'));
      }
  
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  const Booking = mongoose.model('Booking', BookingSchema);
  
  module.exports = Booking;