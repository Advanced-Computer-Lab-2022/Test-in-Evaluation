import { apiURL, UserContext } from "../../App";
import { useContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Accordion, Box, Chip, Typography } from "@mui/material";
import YoutubeEmbed from "./YoutubeEmbed";

import type { Course } from "../../types/Types";

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
                }}
            >
                <Box>
                    <Typography
                        style={{
                            fontSize: "45px",
                            color: "#0C0E43",
                            textAlign: "center",
                        }}
                    >
                        {course?.course.title}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Box sx={{ width: "50%" }}>
                        <Typography>{course?.course.summary}</Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <YoutubeEmbed
                            style={{ width: "100%", height: "300px" }}
                            url="https://www.youtube.com/embed/CermGp8bwFE"
                        />
                    </Box>

                    <Box></Box>
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
