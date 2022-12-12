import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Paper,
    Box,
    Chip,
    Typography,
    Accordion,
    Card,
    CardContent,
    CardActions,
    Button,
    Modal,
} from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { Quiz } from "../../components";

import type { ExerciseSolution, Section } from "../../types/Types";

type params = {
    subtitle: Section;
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

const Subtitle = ({ subtitle }: params) => {
    const [isVideoOpen, setVideoOpen] = React.useState(false);
    const [isExerciseOpen, setExerciseOpen] = React.useState(false);
    const [exerciseSolution, setExerciseSolution] =
        React.useState<ExerciseSolution | null>(null);
    const [curScore, setCurScore] = React.useState<number>(0);
    const [isViewingExercises, setIsViewingExercises] = React.useState(false);

    useEffect(() => {
        // Load this section excersize
        axios
            .post(
                `${apiURL}/view_exercise_result`,
                { sectionId: subtitle._id },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.dir(res.data);
                let exerSol: ExerciseSolution = res.data.exerciseSolutions[0];
                setExerciseSolution(exerSol);

                let score = 0;
                exerSol.solutions.forEach((sol, i) => {
                    if (sol === subtitle.exam.exercises[i].correctAnswer) {
                        score++;
                    }
                });
                setCurScore(score);
            });
    }, [subtitle]);

    return (
        <Paper>
            <Modal open={isVideoOpen}>
                <Box sx={style}>
                    <YoutubeEmbed
                        style={{ aspectRatio: "16 / 9", width: "100%" }}
                        url={subtitle.videoUrl}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => setVideoOpen(false)}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={isExerciseOpen}>
                <Box sx={style}>
                    <Quiz
                        section={subtitle}
                        questions={subtitle.exam.exercises}
                        setExerciseOpen={setExerciseOpen}
                        solution={exerciseSolution}
                        isView={isViewingExercises}
                    />
                </Box>
            </Modal>

            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {subtitle.name}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        {subtitle.totalHours + " hours"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {subtitle.description}
                    </Typography>
                    {exerciseSolution !== null && (
                        <div style={{ width: "100%", display: "flex" }}>
                            <Typography>
                                Quiz Result: ({curScore} /{" "}
                                {subtitle.exam.exercises.length})
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ marginLeft: "10px" }}
                                size="small"
                                onClick={() => {
                                    setIsViewingExercises(true);
                                    setExerciseOpen(true);
                                }}
                            >
                                View Solution
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardActions>
                    <Button onClick={() => setVideoOpen(true)}>
                        Watch Video
                    </Button>
                    <Button
                        onClick={() => {
                            setIsViewingExercises(false);
                            setExerciseOpen(true);
                        }}
                    >
                        Solve Exercise
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
};

export default Subtitle;
