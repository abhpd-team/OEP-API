const express = require("express");

const router = express.Router();

// request format to get the list of questions and options:
// req = {
//      examId: String,
//     candidateId: String,
//     candidatePassword: String,
// }

router.get("/", (req, res) => {
    res.send("/examlive");
});

module.exports = router;
