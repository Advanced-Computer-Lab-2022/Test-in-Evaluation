import {
    Autocomplete,
    Paper,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SearchResultItem, { CourseDetails } from "./SearchResultItem";

function SearchResultPage() {
    const sliderMarks = [
        {
            value: 0,
            label: "$0",
        },
        {
            value: 5000,
            label: "$5,000",
        },
        {
            value: 10000,
            label: "$10,000",
        },
    ];

    let crs: CourseDetails = {
        name: "Analysis & Design of Algorithms",
        subtitles: [
            { title: "Divide and Conqre", hours: 4, hasExercise: true },
            { title: "Dyanmic Programming", hours: 2, hasExercise: false },
            { title: "Graphs", hours: 6, hasExercise: true },
            { title: "Segment Tree", hours: 8, hasExercise: false },
        ],
        price: 5000,
        discount: 10,
    };

    let crsList = [];
    for (let i = 0; i < 10; i++) crsList.push({ id: i, ...crs });

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
                    <Paper style={{ padding: "1em" }} elevation={3}>
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
                            />
                            <Autocomplete
                                disablePortal
                                style={{ width: "100%" }}
                                options={["CS", "Math", "English"]}
                                renderInput={(params) => (
                                    <TextField {...params} label="Subject" />
                                )}
                            />
                            <Autocomplete
                                disablePortal
                                style={{ width: "100%" }}
                                options={["Ahmed", "Karim", "Mahmoud"]}
                                renderInput={(params) => (
                                    <TextField {...params} label="Instructor" />
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
                                />
                            </div>
                        </div>
                    </Paper>
                </Grid2>
                <Grid2 xs={8}>
                    <Paper style={{ padding: "1em" }} elevation={3}>
                        <Typography variant="h4" gutterBottom>
                            Search Results
                        </Typography>
                        {crsList.map((course) => (
                            <SearchResultItem {...course} />
                        ))}
                    </Paper>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default SearchResultPage;
