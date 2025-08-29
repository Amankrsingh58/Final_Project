const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const {createBooking, getBookings, updateBookingStatus} = require('../controllers/bookingController')
const router = express.Router();

router.post('/create-booking',auth, createBooking);
router.get('/bookings', auth,getBookings);
router.put('/update-bookings-status', auth,updateBookingStatus);

module.exports = router;
