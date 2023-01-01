import {
    Box,
    Button,
    Card,
    CardActionArea,
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

const SearchResultCard = (props: any) => {
    const navigate = useNavigate();
    const course: Course = props.course;
    const userState = useContext(UserContext);

    useEffect(() => {
        console.log(course);
    }, []);

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "25%",

                    height: "10em",
                }}
            >
                <CardActionArea
                    onClick={() => {
                        navigate("/course/" + course._id);
                    }}
                    sx={{ width: "100%" }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {course.instructor.username}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {course.subjectId?.Name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default SearchResultCard;
