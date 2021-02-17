const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExaminerSchema = new Schema({
    username: String,
    password: String,
    exams: [
        {
            examId: String,
            startDateTime: Date,
            endDateTime: Date,
            totalMarks: Number,
            questions: [
                {
                    questionId: String,
                    marks: Number,
                    value: String,
                    options: [
                        {
                            optionId: String,
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
            classId: String,
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
