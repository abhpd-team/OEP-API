const { response } = require("express");
const express = require("express");

const moment = require("moment");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// to bypass timing restrictions
const devOption = false;

// request format to get the list of questions and options:
// req = {
//     examinerId: String,
//     examId: String,
//     candidateId: String,
//     candidatePassword: String,
// }

function testReq(req) {
    console.log(req.body.examinerId);
    console.log(req.body.examId);
    console.log(req.body.candidateId);
    console.log(req.body.candidatePassword);
}

function verifyTime(startTime, endTime) {
    return moment().isBetween(startTime, endTime);
}

router.post("/getexam", async (req, res) => {
    // res.json({ message: "/examlive/getexam" });
    // testReq(req);
    try {
        const foundExaminer = await Examiner.findOne({
            _id: req.body.examinerId,
        });
        if (foundExaminer === null) {
            res.json({ message: "Invalid examinerId" });
            return;
        } else {
            var foundExamStatus = false;
            for (let index = 0; index < foundExaminer.exams.length; index++) {
                const foundExam = foundExaminer.exams[index];

                if (String(foundExam._id) === req.body.examId) {
                    foundExamStatus = true;

                    const foundCandidate = foundExam.candidates.find(
                        (candidate) => {
                            return (
                                candidate.candidateId ===
                                    req.body.candidateId &&
                                candidate.candidatePassword ===
                                    req.body.candidatePassword
                            );
                        }
                    );

                    if (foundCandidate.hasAppeared) {
                        res.json({
                            message:
                                "candidate has already appeared for the exam",
                        });
                        return;
                    }

                    if (foundCandidate !== undefined) {
                        const questionBank = foundExaminer.questionBanks.find(
                            (queBank) =>
                                String(queBank._id) === foundExam.questionBankId
                        );

                        if (
                            moment().isBetween(
                                foundExam.startDateTime,
                                foundExam.endDateTime
                            ) ||
                            devOption
                        ) {
                            //to check if the request is between the exam start and end time
                            res.json(
                                questionBank === undefined
                                    ? { message: "undefined question bank" }
                                    : {
                                          questionBank: questionBank,
                                          startDateTime:
                                              foundExam.startDateTime,
                                          endDateTime: foundExam.endDateTime,
                                      }
                            );
                            return;
                        } else {
                            res.json({
                                message: `Exam Haven't started yet, try again between ${moment(
                                    foundExam.startDateTime
                                )
                                    .utc()
                                    .format(
                                        "MMMM Do YYYY, h:mm:ss a"
                                    )} & ${moment(foundExam.endDateTime)
                                    .utc()
                                    .format("MMMM Do YYYY, h:mm:ss a")}`,
                            });
                            return;
                        }
                    } else {
                        res.json({
                            message: "Invalid credentials to access the exam",
                        });
                        return;
                    }
                }
            }
            if (!foundExamStatus) {
                res.json({ message: "Invalid ExamId" });
                return;
            }
        }
    } catch (err) {
        res.json({ message: "err" });
        return;
    }
});

// req = {
//     examinerId: String,
//     examId: String,
//     candidateId: String,
//     candidatePassword: String,

//     responses: [
//         {
//             questionId: String,
//             optionId: String,
//         },
//     ]
// }

router.post("/getresult", async (req, res) => {
    // res.json({ message: "/examlive/getresult" });

    await Examiner.findOne({ _id: req.body.examinerId }, (err, examiner) => {
        if (err) {
            res.json({ message: "err" });
            return;
        }

        // console.log(examiner);

        const examIndex = examiner.exams.findIndex(
            (exam) => String(exam._id) === req.body.examId
        );

        // console.log(examIndex);

        // here also verifying credentials
        const candidateIndex = examiner.exams[examIndex].candidates.findIndex(
            (candidate) => {
                return (
                    candidate.candidateId === req.body.candidateId &&
                    candidate.candidatePassword === req.body.candidatePassword
                );
            }
        );

        if (candidateIndex < 0) {
            res.json({
                message: "Invalid credentials to access the exam",
            });
            return;
        }

        // console.log(candidateIndex);

        if (
            moment().isBetween(
                examiner.exams[examIndex].startDateTime,
                examiner.exams[examIndex].endDateTime
            ) ||
            devOption
        ) {
            // verify if user has taken the exam
            if (
                !examiner.exams[examIndex].candidates[candidateIndex]
                    .hasAppeared
            ) {
                // set reposes

                examiner.exams[examIndex].candidates[
                    candidateIndex
                ].hasAppeared = true;

                examiner.exams[examIndex].candidates[candidateIndex].responses =
                    req.body.responses;

                // and calculate the marks

                const foundQuestionBank = examiner.questionBanks.find(
                    (questionBank) =>
                        String(questionBank._id) ===
                        examiner.exams[examIndex].questionBankId
                );

                var marksCount = 0;

                foundQuestionBank.questions.forEach((question) => {
                    const foundResponse = req.body.responses.find(
                        (response) =>
                            response.questionId === String(question._id)
                    );

                    if (foundResponse !== undefined) {
                        const responseOption = question.options.find(
                            (option) =>
                                foundResponse.optionId === String(option._id)
                        );

                        if (
                            responseOption &&
                            responseOption.value === question.correctOptionValue
                        ) {
                            marksCount += 1;
                        }
                    } else {
                        //no response found for the quesion
                    }
                });

                examiner.exams[examIndex].candidates[
                    candidateIndex
                ].Marks = marksCount;

                //Results response
                res.json({
                    candidateName:
                        examiner.exams[examIndex].candidates[candidateIndex]
                            .candidateName,
                    Marks: marksCount,
                    examName: examiner.exams[examIndex].examName,
                    examinerName: examiner.username,
                    examinerEmail: examiner.email,
                });
            } else {
                res.json({
                    message: "candidate has already appeared for the exam",
                });
                return;
            }
        } else {
            res.json({
                message: "Your Submittion is out of exam time",
            });
            return;
        }

        examiner.save();
    });
});

module.exports = router;
