import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";
import { Course } from "../../global";

type props = {
    course: Course;
};

const CourseCard = ({ course }: props) => {
    const courseRating =
        course?.rating?.sumOfRatings / course?.rating?.numberOfRatings || 0;
    return (
        <Card sx={{ textAlign: "left" }}>
            <CardActionArea>
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
                            {course?.subject}
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
                            Price: {course?.price}
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

export default CourseCard;
