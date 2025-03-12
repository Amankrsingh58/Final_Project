const express =  require("express");
const mongoose = require("mongoose");
const router = express.Router();


const {registerUser,loginUser, logoutUser} = require("../controllers/userController");
const { auth, isStudent, isTutor, isAdmin } = require("../middlewares/authMiddleware");
const { HelpRequestHandler, getAllHelpRequest } = require("../controllers/helpRequestController");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.route("/logout").post(auth,logoutUser);
router.route("/studentdashboard").post(isTutor);
// router.post("/submithelpform", auth, HelpRequestHandler);
router.get("/dashboard",auth,isAdmin);

// router.get("/getallhelprequest", getAllHelpRequest);

module.exports = router;
