const express =  require("express");
const mongoose = require("mongoose");
const router = express.Router();


const {registerUser,loginUser, logoutUser} = require("../controllers/userController");
const { verifyJWT } = require("../middlewares/authMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.route("/logout").post(verifyJWT,logoutUser);

module.exports = router;
