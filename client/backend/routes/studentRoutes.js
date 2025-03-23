const express = require('express');
const { getAllStudent, getStudentById } = require('../controllers/studentController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/allstudents", getAllStudent);
router.get("/student/:id",auth, getStudentById);

module.exports = router;