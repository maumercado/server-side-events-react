const express = require("express");
const router = express.Router();
const { stream } = require("../controllers");
router.get("/stream", stream);

//exporting thee router to other modules
module.exports = router;
