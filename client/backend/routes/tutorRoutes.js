const express = require('express');
const { getAllTutor, getTutorById } = require('../controllers/tutorController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/alltutors", auth, getAllTutor);
router.get("/tutor/:id", getTutorById);

module.exports = router;