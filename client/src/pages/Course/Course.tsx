import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Divider,
    Rating,
    styled,
    Typography,
} from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";
import { GetCurrency } from "../../data/currency";
import type { Course } from "../../types/Types";
import { Star, StarBorder } from "@mui/icons-material";
import Subtitle from "./Subtitle";

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
    const [course, setCourse] = React.useState<Course>();

    const { courseId } = useParams();

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
                console.dir(res);
                setCourse(res.data);
            });
    }, []);

    return (
        <div>
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
                        </Box>

                        <Box>
                            <Typography sx={{ color: "white" }}>
                                Rate Course:
                            </Typography>
                        </Box>

                        <Box>
                            <StyledRating
                                name="customized-color"
                                defaultValue={2}
                                getLabelText={(value: number) =>
                                    `${value} Heart${value !== 1 ? "s" : ""}`
                                }
                                precision={0.1}
                                icon={<Star fontSize="inherit" />}
                                emptyIcon={<StarBorder fontSize="inherit" />}
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
                                                <Subtitle subtitle={val} />
                                            </AccordionDetails>
                                        </Accordion>
                                        <Divider />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>

                <Divider />

                <Box>Reviews</Box>

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
