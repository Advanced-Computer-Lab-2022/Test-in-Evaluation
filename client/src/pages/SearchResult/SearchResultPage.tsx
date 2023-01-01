import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Paper,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import axios from "axios";
import { apiURL, UserContext } from "../../App";
import { useState, useEffect, useContext, SetStateAction } from "react";
import { countries } from "../../data/countries";
import { currencyOfCountry } from "../../data/currency";
import { useSearchParams } from "react-router-dom";
import { Course } from "../../types/Types";
import SearchResultCard from "./SearchResultCard";

function SearchResultPage() {
    const userState = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [courseList, setCourseList] = useState<Course[]>([]);

    const filterCourse = (courseObject: Course): boolean => {
        const searchString = searchParams.get("course");
        if (searchString === "" || searchString === null) return true;

        const splitSearchString = searchString.split(" ");
        if (userState.searchTitles)
            if (
                splitSearchString.some((elm) =>
                    courseObject.title
                        ?.toLowerCase()
                        .includes(elm.toLowerCase())
                )
            )
                return true;

        if (userState.searchSubjects)
            if (
                splitSearchString.some((elm) =>
                    courseObject.subjectId?.Name.toLowerCase().includes(
                        elm.toLowerCase()
                    )
                )
            )
                return true;

        if (userState.searchInstructor)
            if (
                splitSearchString.some((elm) =>
                    (
                        courseObject.instructor.firstName +
                        " " +
                        courseObject.instructor.lastName
                    )
                        .toLowerCase()
                        .includes(elm.toLowerCase())
                )
            )
                return true;

        return false;
    };

    const pageLoad = async () => {
        let allCourses = await axios.post(
            apiURL + "/search_courses",
            {},
            { withCredentials: true }
        );

        let courseArray: Course[] = allCourses.data.result as Course[];

        courseArray = courseArray.filter((course: Course) => {
            return filterCourse(course);
        });

        setCourseList(courseArray);
    };

    useEffect(() => {
        pageLoad();
    }, [
        searchParams,
        userState.searchInstructor,
        userState.searchSubjects,
        userState.searchTitles,
    ]);

    return (
        <div style={{ width: "100%" }}>
            <Box style={{ width: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        sx={{
                            fontSize: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Search results:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        padding: "10px",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            flexBasis: "33.333%",
                            flexWrap: "wrap",
                            padding: "1em",
                        }}
                    >
                        {courseList.map((course: Course) => {
                            return (
                                <>
                                    <SearchResultCard course={course} />
                                    <Divider />
                                </>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default SearchResultPage;
