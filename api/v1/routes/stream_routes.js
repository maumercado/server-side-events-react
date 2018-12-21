const express = require("express");
const router = express.Router();
const { stream } = require("../controllers").controllers;

const loadRoutes = () => {
    router.get("/stream", stream.readStream);
    return router;
};

//exporting thee router to other modules
module.exports = { loadRoutes };
