const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// ========= CRUD for exams ============

// --------- CREATE ----------

// request format to add a exam in the list of all exams:
// req = {
//     username: String,
//     password: String,
//     classId: String,
//     newExam: {
//         examName: String,
//         startDateTime: Date,
//         endDateTime: Date,
//         questions: [
//             {
//                 marks: Number,
//                 value: String,
//                 options: [
//                     {
//                         value: String,
//                     },
//                 ],
//             },
//         ],
//     }
// }

router.post("/", async (req, res) => {
    // res.send("/classes");
    try {
        var foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
            "classes._id": req.body.classId,
        });

        const classIndx = foundElement.classes.findIndex((e) => {
            return e._id.toString() === req.body.classId;
        });

        var compiledTotalMarks = 0;

        req.body.newExam.questions.forEach((element) => {
            compiledTotalMarks += element.marks;
        });

        var compiledCandidates = [];

        foundElement.classes[classIndx].candidates.forEach((element) => {
            const randomPassword = (
                Math.random().toString(36).slice(2) +
                Math.random().toString(36).slice(2)
            ).slice(0, 8);

            compiledCandidates.push({
                candidateId: element.candidateId,
                candidateName: element.candidateName,
                candidatePassword: randomPassword,
                hasAppeared: false,
                Marks: 0,
            });
        });

        var compiledObjectExam = {
            examName: req.body.newExam.examName,
            startDateTime: req.body.newExam.startDateTime,
            endDateTime: req.body.newExam.endDateTime,
            totalMarks: compiledTotalMarks,
            questions: req.body.newExam.questions,
            candidates: compiledCandidates,
        };

        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $addToSet: { exams: compiledObjectExam },
            }
        );

        var foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist or no such class" });
        } else {
            res.json(foundElement.exams);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- READ ----------

// request format to get list of all exams:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", async (req, res) => {
    // res.send("/classes");
    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement.exams);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- UPDATE ----------

// request format to update a class details:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      classId: String,
//      updatedClass: {
//          className: String,
//          candidates: [
//              {
//                  _id: String,
//                  candidateId: String,
//                  candidateName: String
//              },
//              {
//                  candidateId: String,
//                  candidateName: String
//              },
//          ]
//      }
// }

router.patch("/", async (req, res) => {
    // res.send("/classes");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
                "classes._id": req.body.updatedClass._id,
            },
            {
                $set: { "classes.$": req.body.updatedClass },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- DELETE ----------

// request format to delete a class:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      examId: Object ID (_Id)
// }

router.delete("/", async (req, res) => {
    // res.send("/classes");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $pull: {
                    exams: { _id: req.body.examId },
                },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement);
        }
    } catch (err) {
        res.json({ message: err });
    }
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
