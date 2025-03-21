const Booking = require("../models/Booking")
const asyncHandler = require("express-async-handler");
const Tutor = require("../models/Tutor");
const Student = require("../models/Student");

const createBooking = asyncHandler(async(req,res) =>{
    try {
        const {tutorId, studentId, bookerRole, bookingStatus} = req.body;

           if (!tutorId || !studentId || !bookerRole ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(bookerRole === 'Student'){
            const tutor = await Tutor.findById(tutorId);
            if(!tutor) return res.status(400).json({ message: 'Tutor not found' });

            const newBooking = new Booking({
                tutorId:tutor.userId,
                studentId,
                bookerRole,
                bookingStatus
            });
    
            const savedBooking = await newBooking.save();

            res.status(201).json({ success: true, booking: savedBooking });
        }

        else if(bookerRole === 'Tutor'){
            const student = await Student.findById(studentId);
            if(!student) return res.status(400).json({ message: 'Student not found' });

            const newBooking = new Booking({
                tutorId,
                studentId:student.userId,
                bookerRole,
                bookingStatus
            });
    
            const savedBooking = await newBooking.save();
            res.status(201).json({ success: true, booking: savedBooking });
        }
       
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }

});

const getBookings = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        const bookings = await Booking.find({
            $or: [
                { tutorId: userId },
                { studentId: userId }
            ]
        })
        .populate({
            path: 'tutorId',
            select: '-password',
            populate: { path: 'tutorId' } 
        }) 
        .populate({
            path: 'studentId',
            select: '-password',
            populate: { path: 'studentId' } 
        }); 

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const { bookingId, newStatus } = req.body;

    if (!bookingId || !newStatus) {
        return res.status(400).json({ message: 'Booking ID and new status are required' });
    }

    if (!['pending', 'cancelled', 'accepted'].includes(newStatus)) {
        return res.status(400).json({ message: 'Invalid status. Valid statuses are: pending, cancelled, accepted' });
    }

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookingStatus = newStatus;
        const updatedBooking = await booking.save();

        res.status(200).json({ success: true, message: 'Booking status updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ message: 'Failed to update booking status', error: error.message });
    }
});


module.exports = {createBooking, getBookings, updateBookingStatus};