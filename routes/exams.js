const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("/exams");
});

router.get("/result", (req, res) => {
    res.send("/exams/result");
});

router.get("/result/candidate", (req, res) => {
    res.send("/exams/result/candidate");
});

module.exports = router;
