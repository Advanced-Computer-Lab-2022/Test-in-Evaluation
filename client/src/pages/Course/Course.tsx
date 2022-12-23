import { apiURL, UserContext } from "../../App";
import { useContext, useEffect, useReducer, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
import YoutubeEmbed from "./YoutubeEmbed";
import { GetCurrency } from "../../data/currency";
import type { CourseWithSections, Review } from "../../types/Types";
import { Star, StarBorder } from "@mui/icons-material";
import Subtitle from "./Subtitle";

// /getAllReviews
// /writeReview

/*

view course preview video
view course subtitles

view overall totalhours

view reviews
view ratings
view instructor
rate course
review course


view subtitle name
view subtitle totalhours
solve subtitle excersise
view course subtitles video

*/

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

const CoursePage = () => {
    const { userInfo } = useContext(UserContext);
    const [course, setCourse] = React.useState<CourseWithSections>();
    const { courseId } = useParams();
    const [rating, setRating] = useState<number | null>(2.5);
    const [review, setReview] = useState<string | null>("");
    const [courseReviews, setCourseReviews] = useState<any[]>([] as any[]);
    const [courseRating, setCourseRating] = useState(0);

    const [isEnrolled, setIsEnrolled] = useState(false);
    useEffect(() => {
        axios
            .post(`${apiURL}/get_is_enrolled`, {
                courseId: courseId!,
            })
            .then((res) => {
                console.log("is enrolled " + res.data);
                setIsEnrolled(res.data);
            });
    }, [courseId]);

    React.useEffect(() => {
        axios
            .post(
                `${apiURL}/get_course`,
                { courseId: courseId },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                setCourse(res.data);
                console.dir(res);
                const cid = res.data.course._id;
                axios
                    .post(
                        `${apiURL}/get_all_reviews`,
                        { reviewed: cid },
                        { withCredentials: true }
                    )
                    .then((result) => {
                        console.dir(result);
                        setCourseReviews(result.data);
                    })
                    .catch((err) => {});
            });
    }, []);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    padding: "10px",
                    backgroundColor: "white",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "15px",
                    width: "100%",
                    maxWidth: "1400px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "1400px",
                        display: "flex",
                        flexDirection: "row",
                        boxShadow: "0px 0px 20px 2px rgba(0.0,0.0,0.0,0.5)",
                    }}
                >
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            backgroundColor: "#171718",
                            padding: "17px",
                            gap: "17px",
                            flexDirection: "column",
                        }}
                    >
                        <Box>
                            <Typography
                                style={{
                                    fontSize: "45px",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                {course?.course.title}
                            </Typography>
                        </Box>
                        <YoutubeEmbed
                            style={{ aspectRatio: "16 / 9", width: "100%" }}
                            url={course?.course.videoPreviewUrl}
                        />
                        <Box>
                            <Typography sx={{ color: "white" }}>
                                {course?.course.summary}
                            </Typography>
                        </Box>

                        <Typography sx={{ color: "white" }}>
                            <Link
                                to={`/instructor/${course?.course.instructor._id}`}
                                style={{ color: "white" }}
                            >
                                {course?.course.instructor.firstName +
                                    " " +
                                    course?.course.instructor.lastName}
                            </Link>
                        </Typography>
                        <Box sx={{ display: "flex", gap: "15px" }}>
                            <Chip
                                sx={{
                                    backgroundColor: "white",
                                    fontWeight: "bold",
                                }}
                                label={course?.course.subjectId.Name}
                            />
                            <Chip
                                sx={{
                                    backgroundColor: "white",
                                    fontWeight: "bold",
                                }}
                                label={
                                    course?.course.totalHours.toString() +
                                    " Hours"
                                }
                            />
                            <Chip
                                sx={{
                                    backgroundColor: "white",
                                    fontWeight: "bold",
                                }}
                                label={
                                    course?.course.price.toString() +
                                    " " +
                                    GetCurrency()
                                }
                            />
                            <Chip
                                sx={{
                                    backgroundColor: "white",
                                    fontWeight: "bold",
                                }}
                                label={courseRating.toString() + " " + "Rating"}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "50%",
                            padding: "15px",
                            background:
                                "repeating-linear-gradient(-20deg,#171718,#171718 10px,#111 10px,#111 20px)",
                        }}
                    >
                        <Box>
                            {isEnrolled ? (
                                <Box>
                                    {course?.sections.map((val, idx) => {
                                        return (
                                            <Box>
                                                <Accordion>
                                                    <AccordionSummary
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>
                                                            {"Section " +
                                                                (idx + 1) +
                                                                " - " +
                                                                val.name}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Subtitle
                                                            subtitle={val}
                                                        />
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Divider />
                                            </Box>
                                        );
                                    })}
                                </Box>
                            ) : (
                                <Box>
                                    {/* Add some more info like price, etc... */}
                                    <Button variant="contained">Enroll</Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Divider />

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
                            sx={{ fontSize: "50px", fontWeight: "bold" }}
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
                                    `${value} Heart${value !== 1 ? "s" : ""}`
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
                                            reviewed: course?.course._id,
                                            score: rating,
                                            text: review,
                                        },
                                        { withCredentials: true }
                                    )
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

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "1400px",
                            gap: "2px",
                        }}
                    >
                        {courseReviews.map((val, idx) => {
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
                                                defaultValue={val.score}
                                                getLabelText={(value: number) =>
                                                    `${value} Heart${
                                                        value !== 1 ? "s" : ""
                                                    }`
                                                }
                                                readOnly
                                                precision={0.1}
                                                icon={
                                                    <Star fontSize="inherit" />
                                                }
                                                emptyIcon={
                                                    <StarBorder
                                                        sx={{ color: "white" }}
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

                {/* <YoutubeEmbed
                    url={"https://www.youtube.com/embed/CermGp8bwFE"}
                />

                <Chip sx={{ backgroundColor: "blue" }} label="Chip Filled" />
                <h2>{course?.course.subjectId.Name}</h2>
                <h3>{course?.course.summary}</h3>
                <h3>{course?.course.totalHours.toString()}</h3>
                <h3>{course?.course.instructor.firstName}</h3>
                <h3>{course?.course.instructor.lastName}</h3>
                <h3>{course?.course.price.toString()}</h3>
                <h3>{course?.course.rating.sumOfRatings.toString()}</h3>
                <h3>{course?.course.rating.numberOfRatings.toString()}</h3> */}
            </Box>
        </div>
    );
};

export default CoursePage;
