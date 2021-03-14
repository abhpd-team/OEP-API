const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv/config");

try {
    mongoose.connect(process.env.DB_EXAMINERS_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log("connected to DB");
} catch (err) {
    console.log(err);
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Importing routes
const exams = require("./routes/exams");
const classes = require("./routes/classes");
const questionbanks = require("./routes/questionbanks");
const examlive = require("./routes/examlive");
const postanswers = require("./routes/postanswers");
const accounts = require("./routes/login");

//Using routes as middleware
app.use("/exams", exams);
app.use("/classes", classes);
app.use("/questionbanks", questionbanks);
app.use("/examlive", examlive);
app.use("/postanswers", postanswers);
app.use("/login", accounts);

//Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Port setup
app.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port 5000");
});
