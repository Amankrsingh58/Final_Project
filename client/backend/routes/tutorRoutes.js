const express = require('express');
const { getAllTutor, getTutorById, deleteTutor } = require('../controllers/tutorController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/alltutors", getAllTutor);
router.get("/tutor/:id",auth, getTutorById);
router.post("/deletetutor",auth, deleteTutor);

module.exports = router;