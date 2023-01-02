import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer, useState } from "react";
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
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
} from "@mui/material";
import ReactPlayer from "react-player/youtube";
import { Quiz } from "../../components";

import type { ExerciseSolution, Section } from "../../types/Types";

type params = {
    subtitle: Section;
    isEnrolled: boolean;
    fetchCourseProgress: () => void;
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

const Subtitle = ({ subtitle, isEnrolled, fetchCourseProgress }: params) => {
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
                let exerSol: ExerciseSolution = res.data.exerciseSolutions[0];
                setExerciseSolution(exerSol);

                if (exerSol) {
                    let score = 0;
                    exerSol.solutions.forEach((sol, i) => {
                        if (sol === subtitle.exam.exercises[i].correctAnswer) {
                            score++;
                        }
                    });
                    setCurScore(score);
                }
            });
    }, [subtitle, isExerciseOpen]);

    const [notes, setNotes] = useState("");

    const downloadNotes = () => {
        axios.post(`${apiURL}/gen_notes_pdf`, { notes: notes }).then((res) => {
            const file = res.data;
            console.dir(file);
            const fileURL = window.URL.createObjectURL(file);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = subtitle.name + " notes.pdf";
            alink.click();
        });
    };

    return (
        <Paper>
            <Dialog open={isVideoOpen} maxWidth="lg">
                <DialogTitle>{subtitle.name}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: "1em" }}>
                        <ReactPlayer
                            style={{ aspectRatio: "16 / 9", width: "100%" }}
                            controls={true}
                            url={subtitle.videoUrl}
                            onEnded={() =>
                                axios
                                    .post(`${apiURL}/record_completed_video`, {
                                        sectionId: subtitle._id,
                                    })
                                    .then((res) => {
                                        fetchCourseProgress();
                                    })
                            }
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <TextField
                                label="Notes"
                                multiline
                                rows={14}
                                sx={{ width: "25vw" }}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            <Button
                                sx={{ alignSelf: "flex-end" }}
                                onClick={downloadNotes}
                            >
                                Download Notes
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setVideoOpen(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal open={isExerciseOpen}>
                <Box sx={style}>
                    <Quiz
                        section={subtitle}
                        questions={subtitle.exam.exercises}
                        setExerciseOpen={setExerciseOpen}
                        solution={exerciseSolution}
                        isView={isViewingExercises}
                        fetchCourseProgress={fetchCourseProgress}
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
                    {exerciseSolution && isEnrolled && (
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
                {isEnrolled && (
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
                )}
            </Card>
        </Paper>
    );
};

export default Subtitle;
