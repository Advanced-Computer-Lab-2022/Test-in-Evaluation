import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogTitle,
    Typography,
} from "@mui/material";
import { apiURL, UserContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import { Course } from "../../types/Types";
import axios from "axios";
import { useNavigate, redirect, Link } from "react-router-dom";
import { GetCurrency } from "../../data/currency";

const emails = ["username@gmail.com", "user02@gmail.com"];

const SearchResultCard = (props: any) => {
    const navigate = useNavigate();
    const course: Course = props.course;
    const userState = useContext(UserContext);

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "25%",
                    padding: "10px",
                    height: "10em",
                }}
            >
                <Box sx={{ width: " 100%" }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {course.instructor.firstName +
                                " " +
                                course.instructor.lastName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {course.subjectId?.Name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => {
                                navigate("/course/" + course._id);
                            }}
                            size="small"
                        >
                            Learn More
                        </Button>
                    </CardActions>
                </Box>
                {(userState.userType === "corporateTraineee" ||
                    userState.userType === "individualTrainee") && (
                    <Box
                        sx={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ height: "100%" }}></div>
                        <Button sx={{ height: "40%" }} variant="contained">
                            {userState.userType === "individualTrainee"
                                ? "Purchase"
                                : "Enroll"}
                        </Button>
                    </Box>
                )}
            </Card>
        </>
    );
};

export default SearchResultCard;
