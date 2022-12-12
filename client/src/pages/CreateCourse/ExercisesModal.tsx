import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";

import { Question } from "./../../components/Excercies/Quiz";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Radio,
    TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";

type ExercisesModalParams = {
    quizQuestions: Question[];
    setQuizQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max(20rem, 50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
};

const ExercisesModal = ({
    quizQuestions,
    setQuizQuestions,
}: ExercisesModalParams) => {
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

    const [error, setError] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setError(false);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" fullWidth>
                Set Exercise
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <CardContent>
                        <Button
                            variant="contained"
                            onClick={addQuestion}
                            style={{ marginBottom: "10px" }}
                        >
                            Add Question
                        </Button>
                        <div style={{ maxHeight: "80vh", overflow: "auto" }}>
                            {quizQuestions.map((question, index) => {
                                return (
                                    <Card
                                        style={{
                                            padding: "10px",
                                            marginBottom: "5px",
                                        }}
                                        variant="outlined"
                                        key={index}
                                    >
                                        <TextField
                                            variant="outlined"
                                            style={{ width: "100%" }}
                                            value={question.question}
                                            onChange={(event) =>
                                                handleQuestionChange(
                                                    index,
                                                    event
                                                )
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
                                                        question.answers[
                                                            answerIndex
                                                        ]
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
                                                onClick={() =>
                                                    deleteQuestion(index)
                                                }
                                                size="small"
                                            >
                                                Delete Question
                                            </Button>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClose} variant="contained">
                            Save Quiz
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
};

export default ExercisesModal;
