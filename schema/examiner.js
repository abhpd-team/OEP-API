const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExaminerSchema = new Schema({
    username: String,
    password: String,
    exams: [
        {
            examName: String,
            startDateTime: Date,
            endDateTime: Date,
            totalMarks: Number,
            questions: [
                {
                    marks: Number,
                    value: String,
                    options: [
                        {
                            value: String,
                        },
                    ],
                },
            ],
            candidates: [
                {
                    candidateId: String,
                    candidateName: String,
                    candidatePassword: String,
                    hasAppeared: Boolean,
                    Marks: Number,
                    responses: [
                        {
                            questionId: String,
                            optionId: String,
                        },
                    ],
                },
            ],
        },
    ],
    classes: [
        {
            className: String,
            candidates: [
                {
                    candidateId: String,
                    candidateName: String,
                },
            ],
        },
    ],
});

module.exports = mongoose.model("examiner", ExaminerSchema);
