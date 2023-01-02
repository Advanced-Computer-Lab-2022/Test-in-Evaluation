import {
    Backdrop,
    CircularProgress,
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    Button,
    Slider,
    Divider,
    Grid,
    Paper,
    TextField,
    Autocomplete,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { apiURL, UserContext } from "../../App";
import { currencyOfCountry, GetCurrency } from "../../data/currency";
import { Course } from "../../types/Types";
import CourseCollectionCard from "./CourseCollectionCard";
export interface CourseDetails {
    id: string;
    name: string;
    desc: string;
    realPrice: number;
    subtitles: {
        title: string;
        hours: number;
        hasExercise: boolean;
    }[];
    price: number;
    discount: number;
    rating: number;
}

const CourseCollectionPage = () => {
    const userState = useContext(UserContext);

    const sliderMarks = [
        {
            value: 0,
            label: "0 " + GetCurrency(),
        },
        {
            value: 5000,
            label: "5,000 " + GetCurrency(),
        },
        {
            value: 10000,
            label: "10,000 " + GetCurrency(),
        },
    ];

    const [subjects, setSubjects] = React.useState([]);
    React.useEffect(() => {
        axios
            .get(apiURL + "/get_all_subjects", { withCredentials: true })
            .then((response) => {
                setSubjects(response.data.map((itm: any) => itm.Name));
            });
    }, []);

    const [instructors, setInstructors] = React.useState([]);
    React.useEffect(() => {
        axios
            .get(apiURL + "/get_all_instructors", { withCredentials: true })
            .then((response) => {
                setInstructors(response.data.map((itm: any) => itm.username));
            });
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    const [courseList, setCourseList] = React.useState<CourseDetails[]>([]);
    const [courseTitle, setCourseTitle] = React.useState(
        searchParams.get("course") || ""
    );
    const [courseSubject, setCourseSubject] = React.useState("");
    const [courseInstructor, setCourseInstructor] = React.useState("");

    const [priceRangeValue, setPriceRangeValue] = React.useState<number[]>([
        0, 10000,
    ]);
    const handlePriceRange = (event: Event, newValue: number | number[]) => {
        setPriceRangeValue(newValue as number[]);
    };

    const [ratingRangeValue, setRatingRangeValue] = React.useState<number[]>([
        0, 5,
    ]);
    const handleRatingRange = (event: Event, newValue: number | number[]) => {
        setRatingRangeValue(newValue as number[]);
    };

    async function filterCourses() {
        let response = await axios.post(
            apiURL + "/search_courses",
            {
                title: courseTitle,
                subject: courseSubject,
                instructor: courseInstructor,
                priceLow: priceRangeValue[0],
                priceHigh: priceRangeValue[1],
                ratingLow: ratingRangeValue[0],
                ratingHigh: ratingRangeValue[1],
            },
            {
                withCredentials: true,
            }
        );

        let crsList = response.data.result.map((itm: any) => {
            return {
                id: itm._id,
                name: itm.title,
                desc: itm.summary,
                price: itm.realPrice,
                discount: itm.discount?.rate ?? 0,
                rating: itm.avgRating.toFixed(2),
            };
        });

        for (let i = 0; i < crsList.length; i++) {
            let course_preview = await axios.post(
                apiURL + "/get_course_preview",
                { courseId: crsList[i].id },
                {
                    withCredentials: true,
                }
            );
            let sections = course_preview.data.sections.map((x: any) => {
                return {
                    title: x.name,
                    hours: x.totalHours,
                    hasExercise: x.exam.exercises.length > 0,
                };
            });
            crsList[i].subtitles = sections;
        }

        setCourseList(crsList);
    }

    React.useEffect(() => {
        setCourseTitle((title) => searchParams.get("course") || title);
    }, [searchParams]);
    React.useEffect(() => {
        filterCourses();
    }, [courseTitle]);

    return (
        <div
            style={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                verticalAlign: "middle",
            }}
        >
            <Grid2 container spacing={2} style={{ width: "75%" }}>
                <Grid2 xs={4}>
                    <Paper style={{ padding: "2em" }} elevation={3}>
                        <Typography variant="h4" gutterBottom>
                            Filter Courses
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <TextField
                                style={{ width: "100%" }}
                                label="Course Name"
                                variant="outlined"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                            />
                            <Autocomplete
                                disablePortal
                                style={{ width: "100%" }}
                                options={subjects}
                                onInputChange={(event, newInputValue) => {
                                    setCourseSubject(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        onChange={(e) =>
                                            setCourseSubject(e.target.value)
                                        }
                                        label="Subject"
                                    />
                                )}
                            />
                            <Autocomplete
                                disablePortal
                                style={{ width: "100%" }}
                                options={instructors}
                                onInputChange={(event, newInputValue) => {
                                    setCourseInstructor(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        onChange={(e) =>
                                            setCourseInstructor(e.target.value)
                                        }
                                        label="Instructor"
                                    />
                                )}
                            />
                            <Typography variant="h6" gutterBottom>
                                Price Range
                            </Typography>
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <Slider
                                    getAriaLabel={() => "Price Range"}
                                    style={{ width: "90%" }}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={10000}
                                    marks={sliderMarks}
                                    value={priceRangeValue}
                                    onChange={handlePriceRange}
                                />
                            </div>
                            <Typography variant="h6" gutterBottom>
                                Rating
                            </Typography>
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <Slider
                                    getAriaLabel={() => "Price Range"}
                                    style={{ width: "90%" }}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                    value={ratingRangeValue}
                                    onChange={handleRatingRange}
                                />
                            </div>
                            <Button variant="contained" onClick={filterCourses}>
                                Filter
                            </Button>
                        </div>
                    </Paper>
                </Grid2>
                <Grid2 xs={8}>
                    <Paper style={{ padding: "1em" }} elevation={3}>
                        <Typography variant="h4" gutterBottom>
                            Filter Results
                        </Typography>
                        {courseList.map((course) => (
                            <CourseCollectionCard {...course} />
                        ))}
                    </Paper>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default CourseCollectionPage;
