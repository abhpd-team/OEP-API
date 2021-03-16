const express = require("express");

const router = express.Router();

const Examiner = require("../schema/examiner");

const authenticateJWToken = require("./auth/auth");

// ========= CRUD for classes ============

// --------- CREATE ----------

// request format to add a questionBank in the list of all questionBanks:
// req = {
//      questionBank: {
//          questionBankName: String,
//      }
// }

router.post("/new", authenticateJWToken, async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.payload.username,
            },
            {
                $addToSet: { questionBanks: req.body.questionBank },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.payload.username,
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
// only a valid jwt

router.post("/get", authenticateJWToken, async (req, res) => {
    // res.send("/questionbanks");
    try {
        const foundElement = await Examiner.findOne({
            username: req.payload.username,
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

// --------- UPDATE ----------

// request format to update a class details:
// req = {
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

router.post("/upd", authenticateJWToken, async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.payload.username,
                "questionBanks._id": req.body.updatedQuestionBank._id,
            },
            {
                $set: { "questionBanks.$": req.body.updatedQuestionBank },
            }
        );

        foundElement = await Examiner.findOne({
            username: req.payload.username,
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
//      questionBankId: Object ID (_Id)
// }

router.post("/del", authenticateJWToken, async (req, res) => {
    // res.send("/questionbanks");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.payload.username,
            },
            {
                $pull: {
                    questionBanks: { _id: req.body.questionBankId },
                },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.payload.username,
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
