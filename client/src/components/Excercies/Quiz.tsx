import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer } from "react";
import {
    Box,
    Stepper,
    Step,
    StepButton,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React from "react";
import { Exercise, ExerciseSolution, Section } from "../../types/Types";
import axios from "axios";

type QuizProps = {
    isView: boolean;
    solution: ExerciseSolution | null;
    section: Section;
    questions: Exercise[];
    setExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchCourseProgress: () => void;
};

const Quiz = ({
    isView,
    solution,
    section,
    questions,
    setExerciseOpen,
    fetchCourseProgress,
}: QuizProps) => {
    const { userInfo } = useContext(UserContext);

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: number;
    }>({});

    useEffect(() => {
        if (isView && solution) {
            let tmp: any = {};
            for (let i = 0; i < solution.solutions.length; i++) {
                tmp[i] = solution.solutions[i];
            }
            setCompleted(tmp);
        }
    }, [solution, isView]);

    const radioGroupRef = React.useRef<HTMLDivElement>(null);

    const totalSteps = () => {
        return questions.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? questions.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleSubmit = async () => {
        console.log(Object.values(completed));
        let res = await axios.post(
            apiURL + "/solve_exercise",
            {
                sectionId: section._id,
                answers: Object.values(completed),
            },
            {
                withCredentials: true,
            }
        );
        if (res.data.success) {
            setExerciseOpen(false);
            axios
                .post(apiURL + "/record_completed_exercise", {
                    sectionId: section._id,
                })
                .then((res) => {
                    if (res.data.success) {
                        fetchCourseProgress();
                    }
                });
        }
    };

    const forceUpdate = useReducer((x) => x + 1, 0)[1];
    const handleOnRadioChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.value);
        const newCompleted = completed;
        newCompleted[activeStep] = parseInt(event.target.value);
        setCompleted(newCompleted);
        forceUpdate();
    };

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "1rem",
                }}
            >
                <Typography variant="h5">{section.name} Exercise</Typography>
                <Button
                    variant="contained"
                    onClick={() => setExerciseOpen(false)}
                >
                    Close
                </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {questions.map((quest, index) => (
                        <Step
                            key={"Question " + (index + 1)}
                            completed={completed[index] !== undefined}
                        >
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                            >
                                {"Question " + index}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <React.Fragment>
                        <div style={{ padding: "5px" }}>
                            <Typography variant="h4">
                                {questions[activeStep].question}
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    ref={radioGroupRef}
                                    value={
                                        completed[activeStep] == undefined
                                            ? null
                                            : completed[activeStep]
                                    }
                                    onChange={handleOnRadioChange}
                                    name="radio-buttons-group"
                                >
                                    {questions[activeStep].answers.map(
                                        (choice, index) => (
                                            <FormControlLabel
                                                value={index}
                                                control={<Radio />}
                                                label={
                                                    <Typography
                                                        sx={{
                                                            color: isView
                                                                ? questions[
                                                                      activeStep
                                                                  ]
                                                                      .correctAnswer ===
                                                                  index
                                                                    ? "green"
                                                                    : solution
                                                                          ?.solutions[
                                                                          activeStep
                                                                      ] ===
                                                                      index
                                                                    ? "red"
                                                                    : "black"
                                                                : "black",
                                                        }}
                                                    >
                                                        {choice}
                                                    </Typography>
                                                }
                                                disabled={isView}
                                            />
                                        )
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                            }}
                        >
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button
                                onClick={handleNext}
                                sx={{ mr: 1 }}
                                disabled={isLastStep()}
                            >
                                Next
                            </Button>
                        </Box>
                        {allStepsCompleted() && (
                            <Button
                                variant="contained"
                                sx={{ width: "100%", marginTop: "20px" }}
                                onClick={handleSubmit}
                                disabled={isView}
                            >
                                Submit
                            </Button>
                        )}
                    </React.Fragment>
                </div>
            </Box>
        </div>
    );
};

export default Quiz;
