const express = require("express");
const { sendNotice, getAllNotices } = require("../controllers/noticeController");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/send-notice", sendNotice);
router.get("/notices/:userId", getAllNotices);



module.exports = router;