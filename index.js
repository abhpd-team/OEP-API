const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

mongoose.connect(process.env.DB_EXAMINERS_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const app = express();
app.use(bodyParser.json());

//Importing routes
const exams = require("./routes/exams");
const classes = require("./routes/classes");
const examlive = require("./routes/examlive");
const postanswers = require("./routes/postanswers");
const accounts = require("./routes/login");

//Using routes as middleware
app.use("/exams", exams);
app.use("/classes", classes);
app.use("/examlive", examlive);
app.use("/postanswers", postanswers);
app.use("/login", accounts);

//Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Port setup
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
