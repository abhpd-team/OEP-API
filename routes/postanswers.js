const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("/postanswers");
});

module.exports = router;
