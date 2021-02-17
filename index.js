const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

//Importing routes
const exams = require("./routes/exams");
const classes = require("./routes/classes");
const examlive = require("./routes/examlive");
const postanswers = require("./routes/postanswers");

//Using routes in middleware
app.use("/exams", exams);
app.use("/classes", classes);
app.use("/examlive", examlive);
app.use("/postanswers", postanswers);

//Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Port setup
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
