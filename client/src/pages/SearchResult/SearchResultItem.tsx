import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState, useContext, SetStateAction } from "react";
import { apiURL, UserContext } from "../../App";
import { countries } from "../../data/countries";

const countryToCurrency = require("country-to-currency");

const currencyOfCountry = (countryName: string) => {
    const [validCountry] = countries.filter(
        (element) => element.label === countryName
    );
    return countryToCurrency[validCountry.code];
};

export interface CourseDetails {
    name: string;
    subtitles: {
        title: string;
        hours: number;
        hasExercise: boolean;
    }[];
    price: number;
    discount: number;
}

function SearchResultItem(courseInfo: CourseDetails) {
    let totalHours = 0;
    const userState = useContext(UserContext);
    for (let subtitle of courseInfo.subtitles) {
        totalHours += subtitle.hours;
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{courseInfo.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Card elevation={0} sx={{ minWidth: 275 }}>
                    <CardContent sx={{ padding: 0 }}>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {totalHours} total hours
                        </Typography>
                        <Typography variant="h6" component="div">
                            Course Subtitles
                        </Typography>
                        <ul>
                            {courseInfo.subtitles.map((st) => (
                                <li>
                                    <div
                                        style={{ display: "flex", gap: "5px" }}
                                    >
                                        <Typography
                                            variant="button"
                                            display="block"
                                            gutterBottom
                                        >
                                            {st.title}
                                        </Typography>
                                        <strong>&#183;</strong>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {st.hours} hours
                                        </Typography>
                                        {st.hasExercise && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "5px",
                                                }}
                                            >
                                                <strong>&#183;</strong>
                                                <Typography
                                                    sx={{ fontSize: 14 }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Has Exercise
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {courseInfo.discount > 0 && (
                            <div style={{ display: "flex", gap: "5px" }}>
                                <Typography variant="h5" gutterBottom>
                                    {courseInfo.price +
                                        " " +
                                        currencyOfCountry(userState.country)}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 14, alignSelf: "center" }}
                                    color="green"
                                    gutterBottom
                                >
                                    {courseInfo.discount}% off
                                </Typography>
                            </div>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </AccordionDetails>
        </Accordion>
    );
}

export default SearchResultItem;
