import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, LinearProgress, Rating } from "@mui/material";
import { useState, useContext, SetStateAction, useEffect } from "react";
import { apiURL, UserContext } from "../../App";
import { countries } from "../../data/countries";
import { useNavigate } from "react-router-dom";
import { currencyOfCountry } from "../../data/currency";
import { Enrollment } from "../../types/Types";
import axios from "axios";

type props = {
    enrollment: Enrollment;
};

const StudentCourseCard = ({ enrollment }: props) => {
    const userState = useContext(UserContext);
    const navigate = useNavigate();

    const course = enrollment.courseId;

    const onCourseClick = (id: String) => {
        navigate(`/course/${id}`);
    };

    const [courseProgress, setCourseProgress] = useState({
        count: 0,
        total: 1,
    });

    const fetchCourseProgress = () => {
        axios
            .post(apiURL + "/get_completed_course_ratio", {
                courseId: course._id,
            })
            .then((res) => {
                setCourseProgress(res.data);
            });
    };

    useEffect(() => {
        fetchCourseProgress();
    }, [course]);

    return (
        <Card sx={{ textAlign: "left", width: "100%" }}>
            <CardActionArea
                onClick={() => {
                    onCourseClick(course._id);
                }}
            >
                <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {course?.title}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >
                        <Typography variant="subtitle1" color="text.secondary">
                            {course?.instructor?.firstName}{" "}
                            {course?.instructor?.lastName}
                        </Typography>
                        <strong>&#183;</strong>
                        <Typography variant="subtitle1" color="text.secondary">
                            {course?.subjectId?.Name}
                        </Typography>
                        <strong>&#183;</strong>
                        <Typography variant="subtitle1" color="text.secondary">
                            {course?.totalHours} Hours
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (courseProgress.count /
                                        courseProgress.total) *
                                    100
                                }
                            />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >{`${Math.round(
                                (courseProgress.count / courseProgress.total) *
                                    100
                            )}%`}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StudentCourseCard;
