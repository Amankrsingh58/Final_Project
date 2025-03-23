const express = require('express');
const { getAllTutor, getTutorById } = require('../controllers/tutorController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/alltutors", getAllTutor);
router.get("/tutor/:id",auth, getTutorById);

module.exports = router;