import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Rating } from "@mui/material";

type Course = {
    title: string;
    subject: string;
    summary: string;
    totalHours: number;
    price: number;
    rating: {
        sumOfRatings: number;
        numberOfRatings: number;
    };
    instructor: string;
};
const course: Course = {
    title: "Introduction to React",
    subject: "Web Development",
    summary: "Learn the basics of React",
    totalHours: 10.5,
    price: 49,
    rating: {
        sumOfRatings: 22,
        numberOfRatings: 5,
    },
    instructor: "John Doe",
};
const CourseCard = () => {
    const courseRating =
        course.rating.sumOfRatings / course.rating.numberOfRatings;
    return (
        <Card sx={{ textAlign: "left" }}>
            <CardActionArea>
                <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {course.instructor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {course.subject}
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
                            Price: {course.price}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {course.totalHours} Hours
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CourseCard;
