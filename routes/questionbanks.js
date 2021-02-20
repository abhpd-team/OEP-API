const express = require("express");

const router = express.Router();

const Examiner = require("../schema/examiner");

// ========= CRUD for classes ============

// --------- CREATE ----------

// request format to add a questionBank in the list of all questionBanks:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      questionBank: {
//          questionBankName: String,
//      }
// }

router.post("/", async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $addToSet: { questionBanks: req.body.questionBank },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement.questionBanks);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- READ ----------

// request format to get list of all questionBanks:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", async (req, res) => {
    // res.send("/questionbanks");
    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement.questionBanks);
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
//     updatedQuestionBank: {
//          _id: String,
//          questionBankName: String,
//          questions: [
//                {
//                   marks: Number,
//                   value: String,
//                     options: [
//                         {
//                            value: String,
//                         },
//                     ],
//                     correctOptionValue: String,
//                },
//           ],
//      },
// }

router.patch("/", async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
                "questionBanks._id": req.body.updatedQuestionBank._id,
            },
            {
                $set: { "questionBanks.$": req.body.updatedQuestionBank },
            }
        );

        foundElement = await Examiner.findOne({
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
//      questionBankId: Object ID (_Id)
// }

router.delete("/", async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $pull: {
                    questionBanks: { _id: req.body.questionBankId },
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

module.exports = router;
