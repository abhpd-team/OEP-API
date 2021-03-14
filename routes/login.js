const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// request format to login:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.post("/", async (req, res) => {
    // res.send("/login");

    // console.log(req.body);

    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            //signing token for session
            const accessToken = jwt.sign(
                { username: req.body.username },
                process.env.JWT_SECRET_KEY
            );

            res.json({ jwt: accessToken });
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
        const container = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };

        const foundElement = await Examiner.findOne({
            username: req.body.username,
        });
        if (foundElement === null) {
            const newExaminer = new Examiner(container);
            try {
                const savedExaminer = await newExaminer.save();
                res.json({ message: "Signup success" });
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
