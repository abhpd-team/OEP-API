const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("/postanswers");
});

// request format submit the responses:
// req = {
//     examId: String,
//     candidateId: String,
//     candidatePassword: String,
// body = {
//     responses: [
//         {
//             questionId: String,
//             optionId: String,
//         }
//     ]
// }
// }

router.post("/", (req, res) => {
    res.send("Your responses has been submitted successfully.");
});

module.exports = router;
