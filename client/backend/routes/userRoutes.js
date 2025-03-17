const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/authMiddleware');
const { getUserData, updateProfile } = require('../controllers/userController');

router.get('/profile', auth, getUserData);
router.put('/profile/:id',auth, updateProfile);

module.exports = router;