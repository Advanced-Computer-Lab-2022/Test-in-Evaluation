import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogTitle,
    Typography,
} from "@mui/material";
import { apiURL, UserContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import { Course } from "../../types/Types";
import axios from "axios";
import { GetCurrency } from "../../data/currency";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
    courseId: string;
    open: boolean;
    onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, courseId } = props;
    const [loadedInfo, setLoadedInfo] = useState<boolean>(false);
    const [courseInfo, setCourseInfo] = useState<any>();

    useEffect(() => {
        axios
            .post(
                apiURL + "/get_course",
                { courseId: courseId },
                { withCredentials: true }
            )
            .then((course) => {
                setLoadedInfo(true);
                setCourseInfo(course.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ width: " 30em" }}>
                {!loadedInfo && (
                    <Box
                        sx={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {loadedInfo && (
                    <Box
                        sx={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <Typography>
                            Price:{" "}
                            {courseInfo?.course?.price + " " + GetCurrency()}
                        </Typography>
                        <Typography>Discount:</Typography>
                        <Typography>Total Hours:</Typography>
                        <Typography>Price:</Typography>
                        <Typography>Price:</Typography>
                        <Typography>Price:</Typography>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}

const SearchResultCard = (props: any) => {
    const course: Course = props.course;
    const [learnMore, setLearnMore] = useState(false);
    const userState = useContext(UserContext);

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "27%",
                    padding: "10px",
                    height: "100%",
                }}
            >
                <Box sx={{ width: " 100%" }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {course.instructor.firstName +
                                " " +
                                course.instructor.lastName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {course.subjectId?.Name}
                        </Typography>
                    </CardContent>
                    {userState.userType !== "corporateTrainee" && (
                        <>
                            <CardActions>
                                <Button
                                    onClick={() => {
                                        setLearnMore(!learnMore);
                                    }}
                                    size="small"
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                            <SimpleDialog
                                courseId={course._id}
                                open={learnMore}
                                onClose={() => {
                                    setLearnMore(false);
                                }}
                            />
                        </>
                    )}
                </Box>
                {(userState.userType === "corporateTraineee" ||
                    userState.userType === "individualTrainee") && (
                    <Box
                        sx={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ height: "100%" }}></div>
                        <Button sx={{ height: "40%" }} variant="contained">
                            {userState.userType === "individualTrainee"
                                ? "Purchase"
                                : "Enroll"}
                        </Button>
                    </Box>
                )}
            </Card>
        </>
    );
};

export default SearchResultCard;
