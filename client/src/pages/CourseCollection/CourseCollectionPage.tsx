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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL, UserContext } from "../../App";

const CourseCollectionPage = () => {
    const [pageLoaded, setPageLoaded] = useState<boolean>(false);
    const [courseList, setCourseList] = useState();
    const [filterSubject, setFilterSubject] = useState<string>("");
    const [filterRatingLower, setFilterRatingLower] = useState();
    const [filterRatingHigher, setFilterRatingHigher] = useState();
    const [filterPricesLower, setFilterPricesLower] = useState();
    const [filterPricesHigher, setFilterPricesHigher] = useState();

    const onPageLoad = async () => {
        const coursesInfo = await axios.post(
            apiURL + "/search_courses",
            {},
            { withCredentials: true }
        );
        setCourseList(coursesInfo.data);
        setPageLoaded(true);
    };

    useEffect(() => {
        onPageLoad();
    }, []);

    if (!pageLoaded)
        return (
            <Backdrop sx={{ color: "#fff", zIndex: "100" }} open={true}>
                <CircularProgress sx={{ color: "white" }} />
            </Backdrop>
        );
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "70%", display: "flex", flexDirection: "row" }}>
                <Box
                    sx={{
                        boxShadow: "3px 3px 5px rgba(0.0,0.0,0.0,0.5)",
                        width: "50%",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Typography sx={{ fontSize: "30px" }}>
                        Filter Options
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                            Subject Filter
                        </InputLabel>
                        <Select
                            value={filterSubject}
                            label="Age"
                            onChange={(event: SelectChangeEvent) => {
                                setFilterSubject(event.target.value);
                            }}
                        >
                            <MenuItem value={"bruh"}>Ten</MenuItem>
                            <MenuItem value={"yeet"}>Twenty</MenuItem>
                            <MenuItem value={"yote"}>Thirty</MenuItem>
                        </Select>
                        <Button>Clear Filter</Button>
                    </Box>
                </Box>
                <Box sx={{ width: "100%" }}></Box>
            </Box>
        </Box>
    );
};

export default CourseCollectionPage;
