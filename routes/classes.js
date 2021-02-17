const express = require("express");

const router = express.Router();

// request format to get list of all classes:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", (req, res) => {
    res.send("/classes");
});

// request format to get list of all candidates in class:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }
router.get("/candidates", (req, res) => {
    res.send("/classes/candidates");
});

module.exports = router;
