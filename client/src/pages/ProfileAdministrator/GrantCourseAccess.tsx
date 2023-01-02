import {
    Alert,
    AlertColor,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { apiURL } from "../../App";

type Trainee = {
    username: string;
    studentId: string;
};

type CourseItem = {
    courseTitle: string;
    courseId: string;
};

const GrantCourseAccess = () => {
    const [pageLoad, setPageLoad] = useState<boolean>(false);
    const [traineeList, setTraineeList] = useState<Trainee[]>([] as Trainee[]);
    const [courseList, setCourseList] = useState<CourseItem[]>(
        [] as CourseItem[]
    );
    const [chosenTrainee, setChosenTrainee] = useState<Trainee>({} as Trainee);
    const [chosenCourse, setChosenCourse] = useState<CourseItem>(
        {} as CourseItem
    );
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>();
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleSubmission = () => {
        if (chosenTrainee?.username === undefined) return;
        if (chosenCourse?.courseTitle === undefined) return;

        axios
            .post(
                `${apiURL}/add_student_to_course`,
                {
                    studentId: chosenTrainee.studentId,
                    courseId: chosenCourse.courseId,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setOpen(true);
                setSnackbarMessage("Successfully Granted Request");
                setSnackbarSeverity("success");
            })
            .catch((error) => {
                setOpen(true);
                setSnackbarMessage("Error occurred: " + error);
                setSnackbarSeverity("error");
            });
    };

    const onPageLoad = async () => {
        // Get all corporate trainees
        const allCorpTrainees = await axios.get(`${apiURL}/get_corp_users`, {
            withCredentials: true,
        });

        const corpTraineeList = allCorpTrainees.data?.map((trainee: any) => {
            return { username: trainee.username, studentId: trainee._id };
        });

        setTraineeList(corpTraineeList);

        // Get all courses
        const allCourses = await axios.post(
            `${apiURL}/search_courses`,
            {},
            { withCredentials: true }
        );
        const courseIdList = allCourses.data?.result?.map((course: any) => {
            return { courseTitle: course.title, courseId: course._id };
        });

        setCourseList(courseIdList);
        setPageLoad(true);
    };

    useEffect(() => {
        onPageLoad();
    }, []);

    if (!pageLoad) return <div>Loading...</div>;
    return (
        <div style={{ width: "100%" }}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography>Grant access to</Typography>
                <Box sx={{ width: "60%" }}>
                    <FormControl fullWidth>
                        <InputLabel>Trainee</InputLabel>
                        <Select
                            value={chosenTrainee?.username}
                            label="Trainee"
                            onChange={(event: SelectChangeEvent) => {
                                setChosenTrainee(event.target.value as any);
                            }}
                        >
                            {traineeList.map((trainee: any) => {
                                return (
                                    <MenuItem value={trainee}>
                                        {trainee.username}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Typography>to the course</Typography>
                <Box sx={{ width: "60%" }}>
                    <FormControl fullWidth>
                        <InputLabel>Course</InputLabel>
                        <Select
                            value={chosenCourse?.courseTitle}
                            label="Course"
                            onChange={(event: SelectChangeEvent) => {
                                setChosenCourse(event.target.value as any);
                            }}
                        >
                            {courseList.map((course: any) => {
                                return (
                                    <MenuItem value={course}>
                                        {course.courseTitle}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Button
                        onClick={() => {
                            handleSubmission();
                        }}
                        variant="contained"
                    >
                        Grant Access
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={handleClose}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GrantCourseAccess;
