import {
    Autocomplete,
    Box,
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
import { useState, useEffect, useContext, SetStateAction } from "react";
import { countries } from "../../data/countries";
import { currencyOfCountry } from "../../data/currency";
import { useSearchParams } from "react-router-dom";
import { Course } from "../../types/Types";

function SearchResultPage() {
    const userState = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [courseList, setCourseList] = useState<Course[]>([]);

    const filterCourse = (courseObject: Course): boolean => {
        if (searchParams.get("course") === "") return true;

        let result = false;
        // const courseSearchArray = searchParams.get("course").split(" ");
        // let titleSearch:boolean = (userState.searchTitles && courseSearchArray.some((elm) => {courseObject.title.toLowerCase().includes(elm.toLowerCase());

        return false;
    };

    useEffect(() => {
        axios
            .post(apiURL + "/search_courses", {}, { withCredentials: true })
            .then((response) => {
                let courseArray = response.data.result;
                courseArray = courseArray.filter((elm: Course) => {
                    return filterCourse(elm);
                });
                setCourseList(courseArray);
            })
            .catch((_error) => {});
    }, [
        useSearchParams(),
        userState.searchInstructor,
        userState.searchSubjects,
        userState.searchTitles,
    ]);

    return (
        <div>
            <Box sx={{ dispaly: "flex", flexDirection: "column" }}>
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
            {courseList.map((elm: Course) => {
                return <div>bruh</div>;
            })}
        </div>
    );
}

export default SearchResultPage;
