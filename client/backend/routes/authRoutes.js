const express =  require("express");
const mongoose = require("mongoose");
const router = express.Router();


const {registerUser,loginUser, logoutUser, verifyToken, changePassword} = require("../controllers/authController");
const { auth, isStudent, isTutor, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.route("/logout").post(auth,logoutUser);
router.put("/change-password",auth,changePassword)
router.route("/verify-token").get(verifyToken);
router.route("/studentdashboard").post(isTutor);
router.get("/dashboard",auth,isAdmin);


module.exports = router;
