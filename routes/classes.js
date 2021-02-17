const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("/classes");
});

router.get("/candidate", (req, res) => {
    res.send("/classes/candidate");
});

module.exports = router;
