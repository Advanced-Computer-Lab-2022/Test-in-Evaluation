import {
    Autocomplete,
    Button,
    Paper,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import axios from "axios";
import SearchResultItem, { CourseDetails } from "./SearchResultItem";
import { apiURL, UserContext } from "../../App";
import { useState, useContext, SetStateAction } from "react";
import { countries } from "../../data/countries";
import { currencyOfCountry } from "../../data/currency";
import { useSearchParams } from "react-router-dom";

function SearchResultPage() {
    const userState = useContext(UserContext);

    const sliderMarks = [
        {
            value: 0,
            label: "0 " + currencyOfCountry(userState.country),
        },
        {
            value: 5000,
            label: "5,000 " + currencyOfCountry(userState.country),
        },
        {
            value: 10000,
            label: "10,000 " + currencyOfCountry(userState.country),
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
    async function filterCourses() {
        let response = await axios.post(
            apiURL + "/search_courses",
            {
                title: courseTitle,
                subject: courseSubject,
                instructor: courseInstructor,
                priceLow: priceRangeValue[0],
                priceHigh: priceRangeValue[1],
            },
            {
                withCredentials: true,
            }
        );

        let crsList = response.data.result.map((itm: any) => {
            return {
                id: itm._id,
                name: itm.title,
                price: itm.price,
                discount: 10,
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
                    hasExercise: false,
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
                            <Button variant="contained" onClick={filterCourses}>
                                Search
                            </Button>
                        </div>
                    </Paper>
                </Grid2>
                <Grid2 xs={8}>
                    <Paper style={{ padding: "1em" }} elevation={3}>
                        <Typography variant="h4" gutterBottom>
                            Search Results
                        </Typography>
                        {courseList.map((course) => (
                            <SearchResultItem {...course} />
                        ))}
                    </Paper>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default SearchResultPage;
