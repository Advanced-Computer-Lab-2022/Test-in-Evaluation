import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Radio,
    TextField,
} from "@mui/material";
import axios from "axios";
import { Exercise } from "../../types/Types";

type CreateQuizProps = {
    courseId: String;
    subtitleId: String;
};

const CreateQuiz = ({ courseId, subtitleId }: CreateQuizProps) => {
    const [quizQuestions, setQuizQuestions] = React.useState<Exercise[]>([]);

    const { userInfo } = useContext(UserContext);

    const addQuestion = () => {
        const newQuestions = [...quizQuestions];
        newQuestions.push({
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: 0,
        });
        setQuizQuestions(newQuestions);
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = [...quizQuestions];
        newQuestions.splice(index, 1);
        setQuizQuestions(newQuestions);
    };

    const handleQuestionChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newQuestions = [...quizQuestions];
        newQuestions[index].question = event.target.value;
        setQuizQuestions(newQuestions);
    };

    const handleAnswerChange = (
        questionIndex: number,
        answerIndex: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newQuestions = [...quizQuestions];
        newQuestions[questionIndex].answers[answerIndex] = event.target.value;
        setQuizQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (
        questionIndex: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newQuestions = [...quizQuestions];
        newQuestions[questionIndex].correctAnswer = parseInt(
            event.target.value
        );
        setQuizQuestions(newQuestions);
    };

    const createQuiz = async () => {
        const res = await axios.post(
            apiURL + `/set_subtitle_exercise`,
            {
                courseId: courseId,
                subtitleId: subtitleId,
                exercises: quizQuestions,
            },
            { withCredentials: true }
        );
        if (res.status === 200) {
            alert("Quiz saved successfully.");
        }
    };

    return (
        <div>
            <h1>Create Quiz</h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Button
                        variant="contained"
                        onClick={addQuestion}
                        style={{ marginBottom: "10px" }}
                    >
                        Add Question
                    </Button>
                    {quizQuestions.map((question, index) => {
                        return (
                            <Card
                                style={{ padding: "10px", marginBottom: "5px" }}
                                variant="outlined"
                                key={index}
                            >
                                <TextField
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    value={question.question}
                                    onChange={(event) =>
                                        handleQuestionChange(index, event)
                                    }
                                />
                                {[0, 1, 2, 3].map((answerIndex) => (
                                    <div>
                                        <Radio
                                            value={answerIndex}
                                            checked={
                                                question.correctAnswer ===
                                                answerIndex
                                            }
                                            onChange={(event) =>
                                                handleCorrectAnswerChange(
                                                    index,
                                                    event
                                                )
                                            }
                                        />
                                        <TextField
                                            variant="standard"
                                            value={
                                                question.answers[answerIndex]
                                            }
                                            onChange={(event) =>
                                                handleAnswerChange(
                                                    index,
                                                    answerIndex,
                                                    event
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                                <CardActions>
                                    <Button
                                        onClick={() => deleteQuestion(index)}
                                        size="small"
                                    >
                                        Delete Question
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </CardContent>
                <CardActions>
                    <Button onClick={createQuiz} variant="contained">
                        Create Quiz
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default CreateQuiz;
