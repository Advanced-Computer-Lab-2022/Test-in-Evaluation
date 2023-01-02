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
import { couldStartTrivia } from "typescript";

type props = {
    course: Course;
};
const HomeCourseCard = ({ course }: props) => {
    const navigate = useNavigate();
    const onCourseClick = (id: String) => {
        navigate(`/course/${id}`);
    };
    const userState = useContext(UserContext);

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
                            {course?.avgRating}
                        </Typography>
                        <Rating
                            value={course?.avgRating}
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
                            {course?.discount?.rate > 0 && (
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        alignSelf: "center",
                                    }}
                                    color="green"
                                    gutterBottom
                                >
                                    {(course?.discount?.rate || 0) * 100}% off
                                </Typography>
                            )}
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
