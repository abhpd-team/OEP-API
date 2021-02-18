const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// request format to login:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.post("/", async (req, res) => {
    // res.send("/login");
    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// request format to signup:
// req = {
//     username: String,
//     password: String,
// }

router.post("/signup", async (req, res) => {
    // res.send("/login/signup");

    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            const newExaminer = new Examiner(req.body);
            try {
                const savedExaminer = await newExaminer.save();
                res.json(savedExaminer);
            } catch (err) {
                res.json({ message: err });
            }
        } else {
            res.json({ message: "username is in use, user already exist" });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
