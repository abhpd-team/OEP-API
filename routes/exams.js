const express = require("express");

const router = express.Router();

// request format to get list of all exams:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", (req, res) => {
    res.send("/exams");
});

// request format to get details of perticualr exam:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      examId: String,
// }

router.get("/result", (req, res) => {
    res.send("/exams/result");
});

// request format to get details of perticualr candiate in a perticualr exam:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      examId: String,
//      candidateId: String
// }

router.get("/result/candidate", (req, res) => {
    res.send("/exams/result/candidate");
});

module.exports = router;
