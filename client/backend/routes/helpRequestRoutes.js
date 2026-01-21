const express = require("express");
const router = express.Router();

const { HelpRequestHandler, getAllHelpRequest, markedSolved } = require("../controllers/helpRequestController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/submithelpform",auth, HelpRequestHandler);
router.get("/getallhelprequest", getAllHelpRequest);
router.put("/marksolved/:id", markedSolved);


module.exports = router;