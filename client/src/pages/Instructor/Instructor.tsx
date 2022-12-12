import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
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
import { Star, StarBorder } from "@mui/icons-material";

const SubmitRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#000000",
    },
    "& .MuiRating-iconHover": {
        color: "#000000",
    },
});

const Instructor = () => {
    const { userInfo } = useContext(UserContext);
    const { instructorId } = useParams();
    const [instructor, setInstructor] = useState<User | null>(null);

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
    }, [instructorId]);

    const [rating, setRating] = useState<number | null>(2.5);
    const [review, setReview] = useState<string | null>("");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            {instructor != null && (
                <div>
                    <Typography variant="h4">Instructor</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <Typography variant="h5">
                            {instructor.firstName + " " + instructor.lastName}
                        </Typography>
                        <Typography variant="h6">{instructor.bio}</Typography>

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                maxWidth: "1400px",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    maxWidth: "1400px",
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
                            <TextField
                                label="Add Review"
                                multiline
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows={3}
                                placeholder={"Write your own review here..."}
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
                                                    reviewed: instructor._id,
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
                    </Box>
                </div>
            )}
        </Box>
    );
};

export default Instructor;
