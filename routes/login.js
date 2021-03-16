const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        const foundElement = await Examiner.findOne({
            username: req.body.username,
        });
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            bcrypt.compare(
                req.body.password,
                foundElement.password,
                function (err, result) {
                    if (err) {
                        res.json({ message: err });
                    } else if (result === true) {
                        console.log("Login Credentials match");
                        const accessToken = jwt.sign(
                            { username: req.body.username },
                            process.env.JWT_SECRET_KEY
                        );

                        res.json({ jwt: accessToken });
                    } else {
                        res.json({ message: "Invalid Credentials" });
                    }
                }
            );
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// request format to signup:
// req = {
//     username: String,
//     password: String,
//      email: String
// }

router.post("/signup", async (req, res) => {
    // res.send("/login/signup");

    try {
        //Hahsing password for storage to DB
        const saltRounds = 10;

        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            const container = {
                username: req.body.username,
                password: hash,
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
        });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
