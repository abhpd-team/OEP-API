const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// request format to get the list of questions and options:
// req = {
//      examinerId: String,
//     examId: String,
//     candidateId: String,
//     candidatePassword: String,
// }

router.get("/", async (req, res) => {
    res.json({ message: "/examlive" });
});

module.exports = router;
