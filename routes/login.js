const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// request format to login:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.post("/", (req, res) => {
    // res.send("/login");

    Examiner.findOne(req.body)
        .then((data) => {
            if (data === null) {
                res.json({
                    message: "user dosent exists",
                });
            } else {
                res.json(data);
            }
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

// request format to signup:
// req = {
//     username: String,
//     password: String,
// }

router.post("/signup", (req, res) => {
    // res.send("/login/signup");

    Examiner.findOne({ username: req.body.username }) //Looking if a username already exists
        .then((data) => {
            if (data === null) {
                var newExaminer = new Examiner({
                    username: req.body.username,
                    password: req.body.password,
                });

                newExaminer
                    .save()
                    .then((data) => {
                        res.json(data);
                    })
                    .catch((err) => {
                        res.json({ message: err });
                    });
            } else {
                res.json({ message: "user already exists" });
            }
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
