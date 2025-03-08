const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const { HelpRequest } = require("../controllers/helpRequestController");

router.post("/submithelpform", auth, HelpRequest);