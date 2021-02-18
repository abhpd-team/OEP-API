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
    // res.send("/examlive");
    Examiner.findOne({
        _id: req.body.examinerId,
        exams: [{ examId: req.body.examId }],
    })
        .then((data) => {
            if (data === null) {
                res.json({
                    message:
                        "either this test dosent exits or something went wrong",
                });
            } else {
                res.json(data);
            }
        })
        .catch((err) => {
            res.json({ message: "wrong request" });
        });
});

module.exports = router;
