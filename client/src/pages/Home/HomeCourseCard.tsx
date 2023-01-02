import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Rating,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Course } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import { currencyOfCountry } from "../../data/currency";

type props = {
    course: Course;
};
const HomeCourseCard = ({ course }: props) => {
    const navigate = useNavigate();
    const onCourseClick = (id: String) => {
        navigate(`/course/${id}`);
    };
    const userState = useContext(UserContext);
    const courseRating =
        course?.rating?.sumOfRatings / course?.rating?.numberOfRatings || 0;

    return (
        <Card sx={{ textAlign: "left" }} key={course._id}>
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
                            {course?.realPrice +
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

export default HomeCourseCard;
