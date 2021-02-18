const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// request format to get list of all exams:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", async (req, res) => {
    // res.send("/exams");
    Examiner.findOne({
        username: req.body.username,
        password: req.body.password,
    }).then((data) => {
        res.json(data.exams);
    });
});

// request format to post a new exam:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      exam: {
//          examId: String,
//          startDateTime: Date,
//          endDateTime: Date,
// totalMarks: Number,
// questions: [
//     {
//         questionId: String,
//         marks: Number,
//         value: String,
//         options: [
//             {
//                 optionId: String,
//                 value: String,
//             },
//         ],
//     },
// ],
// candidates: [
//     {
//         candidateId: String,
//         candidateName: String,
//         candidatePassword: String,
//         hasAppeared: Boolean,
//         Marks: Number,
//         responses: [
//             {
//                 questionId: String,
//                 optionId: String,
//             },
//         ],
//     },
// ],
//      }
// }

router.post("/", async (req, res) => {
    Examiner.findOne({
        username: req.body.username,
        password: req.body.password,
    }).then((data) => {
        res.json(data);
    });
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
