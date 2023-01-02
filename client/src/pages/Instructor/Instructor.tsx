import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Rating,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { User } from "../../types/Types";
import axios from "axios";
import { Person, Star, StarBorder } from "@mui/icons-material";

const SubmitRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#000000",
    },
    "& .MuiRating-iconHover": {
        color: "#000000",
    },
});

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ffffff",
    },
    "& .MuiRating-iconHover": {
        color: "#eeeeee",
    },
});

const Instructor = () => {
    const { userInfo } = useContext(UserContext);
    const { instructorId } = useParams();
    const [instructor, setInstructor] = useState<User | null>(null);
    const [instructorReviews, setInstructorReviews] = useState<any[]>(
        [] as any[]
    );

    const getInstructorReviews = () => {
        axios
            .post(
                `${apiURL}/get_all_reviews`,
                { reviewed: instructorId },
                { withCredentials: true }
            )
            .then((result) => {
                setInstructorReviews(result.data);
            })
            .catch((err) => {});
    };

    useEffect(() => {
        axios.get(apiURL + "/get_all_instructors").then((res) => {
            const instructors = res.data;
            console.dir(instructorId);
            console.dir(instructors);
            const instructor = instructors.find(
                (instructor: User) => instructor._id === instructorId
            );
            console.dir(instructor);
            setInstructor(instructor);
        });
        getInstructorReviews();
    }, [instructorId]);

    const [rating, setRating] = useState<number | null>(2.5);
    const [review, setReview] = useState<string | null>("");

    const [avgRating, setAvgRating] = useState<number>(0);
    useEffect(() => {
        let sum = 0;
        instructorReviews.forEach((review: any) => {
            sum += review.score;
        });
        setAvgRating(sum / instructorReviews.length);
    }, [instructorReviews]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Card sx={{ width: "50em", alignSelf: "center" }}>
                <CardContent sx={{ display: "flex", gap: "2em" }}>
                    <Box sx={{ alignSelf: "center" }}>
                        <Person sx={{ fontSize: "20em" }} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.125em",
                        }}
                    >
                        <Typography variant="h3">
                            {instructor?.firstName + " " + instructor?.lastName}
                        </Typography>
                        <Rating
                            value={avgRating}
                            readOnly
                            precision={0.1}
                            sx={{ alignSelf: "center" }}
                        />
                        <Typography variant="body1">
                            {instructor?.bio}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "50px",
                            fontWeight: "bold",
                        }}
                    >
                        Reviews
                    </Typography>
                </Box>
                {(userInfo.type == "corporateTrainee" ||
                    userInfo.type == "individualTrainee") && (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            maxWidth: "1400px",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "1rem",
                        }}
                    >
                        <TextField
                            label="Add Review"
                            multiline
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={3}
                            placeholder={
                                "Write your own review here... If you already reviewed before, the review will be updated!"
                            }
                            variant="filled"
                            sx={{ width: "85%" }}
                        />

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <SubmitRating
                                    name="customized-color"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                    getLabelText={(value: number) =>
                                        `${value} Heart${
                                            value !== 1 ? "s" : ""
                                        }`
                                    }
                                    precision={0.1}
                                    icon={<Star fontSize="inherit" />}
                                    emptyIcon={
                                        <StarBorder
                                            sx={{ color: "black" }}
                                            fontSize="inherit"
                                        />
                                    }
                                />
                            </Box>

                            <Button
                                onClick={() => {
                                    axios
                                        .post(
                                            `${apiURL}/write_review`,
                                            {
                                                reviewed: instructor?._id,
                                                score: rating,
                                                text: review,
                                            },
                                            { withCredentials: true }
                                        )
                                        .then((res) => {
                                            if (res.data.sucess) {
                                                alert(
                                                    "Review submitted successfully!"
                                                );
                                                getInstructorReviews();
                                            } else {
                                                alert(
                                                    "Error submitting review!"
                                                );
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                                sx={{ width: "40%" }}
                                variant="contained"
                            >
                                Submit Review
                            </Button>
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "1400px",
                        gap: "2px",
                    }}
                >
                    {instructorReviews.map((val, idx) => {
                        return (
                            <>
                                <Box
                                    sx={{
                                        backgroundColor: "#171718",
                                        padding: "10px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "20px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "30px",
                                                color: "white",
                                            }}
                                        >
                                            {val.reviewerName + " "}
                                        </Typography>
                                        <StyledRating
                                            name="customized-color"
                                            value={val.score}
                                            getLabelText={(value: number) =>
                                                `${value} Heart${
                                                    value !== 1 ? "s" : ""
                                                }`
                                            }
                                            readOnly
                                            precision={0.1}
                                            icon={<Star fontSize="inherit" />}
                                            emptyIcon={
                                                <StarBorder
                                                    sx={{
                                                        color: "white",
                                                    }}
                                                    fontSize="inherit"
                                                />
                                            }
                                        />
                                    </Box>
                                    <Typography sx={{ color: "white" }}>
                                        {val.text}
                                    </Typography>
                                </Box>
                                <Divider />
                            </>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default Instructor;
