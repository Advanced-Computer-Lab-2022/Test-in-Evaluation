import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";
import { useState, useContext, SetStateAction } from "react";
import { apiURL, UserContext } from "../../App";
import { countries } from "../../data/countries";
import { useNavigate } from "react-router-dom";
import { currencyOfCountry } from "../../data/currency";
import { Enrollment } from "../../types/Types";

type props = {
    enrollment: Enrollment;
};

const StudentCourseCard = ({ enrollment }: props) => {
    const userState = useContext(UserContext);
    const navigate = useNavigate();

    const course = enrollment.courseId;

    const courseRating =
        course?.rating?.sumOfRatings / course?.rating?.numberOfRatings || 0;

    const onCourseClick = (id: String) => {
        navigate(`/course/${id}`);
    };

    return (
        <Card sx={{ textAlign: "left" }}>
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
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {course?.instructor?.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {course?.subjectId?.Name}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="text.secondary"
                        >
                            {courseRating}
                        </Typography>
                        <Rating
                            value={courseRating}
                            precision={0.5}
                            readOnly
                            size="small"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold">
                            Price:{" "}
                            {course?.price +
                                " " +
                                currencyOfCountry(userState.country)}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {course?.totalHours} Hours
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StudentCourseCard;
