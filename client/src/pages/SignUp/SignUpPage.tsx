import React, { useState } from "react";
import "./SignUpPage.css";
import countryList from "../../data/countries";
import {
    TermsOfService,
    PrivacyPolicy,
    ContentOwnershipPolicy,
} from "../../data/policies";
import {
    Autocomplete,
    Tabs,
    Tab,
    ToggleButtonGroup,
    ToggleButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SignUpPage() {
    const [tab, setTab] = useState("individual");

    return (
        <div className="sign-up-page" style={{ width: "100%", height: "100%" }}>
            <div className="sign-up-form">
                <label style={{ paddingLeft: "30px", fontSize: "40px" }}>
                    Sign Up
                </label>

                <Tabs
                    style={{ paddingLeft: "10%", width: "100%" }}
                    value={tab}
                    onChange={(event, value) => {
                        setTab(value);
                    }}
                    aria-label="basic tabs example"
                >
                    <Tab label="Individual Trainee" value="individual" />
                    <Tab label="Instructor" value="instructor" />
                </Tabs>

                <div className="form-items">
                    <TextField
                        required
                        variant="outlined"
                        label="Email"
                        defaultValue=""
                    />
                    <TextField
                        required
                        variant="outlined"
                        label="Username"
                        defaultValue=""
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                        }}
                    >
                        <TextField
                            required
                            variant="outlined"
                            label="First name"
                            defaultValue=""
                            style={{ width: "100%" }}
                        />
                        <TextField
                            required
                            style={{ width: "100%" }}
                            variant="outlined"
                            label="Last name"
                            defaultValue=""
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                        }}
                    >
                        <TextField
                            required
                            variant="outlined"
                            label="Password"
                            type="password"
                            defaultValue=""
                            style={{ width: "100%" }}
                        />
                        <TextField
                            required
                            style={{ width: "100%" }}
                            variant="outlined"
                            type="password"
                            label="Repeat password"
                            defaultValue=""
                        />
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="select-gender-label">
                            Gender *
                        </InputLabel>
                        <Select
                            labelId="select-gender-label"
                            id="select-gender-component"
                            label="Gender"
                            variant="outlined"
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        disablePortal
                        id="country-select"
                        options={countryList}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Country " />
                        )}
                    />

                    <div>
                        <label style={{ fontSize: "13px" }}>
                            <Checkbox />
                            By checking this box, you agree to our:{" "}
                        </label>
                        <Accordion sx={{ fontSize: "13px" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ height: "10px" }}
                            >
                                <p>Terms of Service</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{TermsOfService}</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{ fontSize: "13px" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ height: "10px" }}
                            >
                                <p>Privacy Policy</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{PrivacyPolicy}</p>
                            </AccordionDetails>
                        </Accordion>
                        {tab === "instructor" && (
                            <Accordion sx={{ fontSize: "13px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{ height: "10px" }}
                                >
                                    <p>Content Ownership Policy</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>{ContentOwnershipPolicy}</p>
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </div>

                    <Button
                        style={{
                            marginLeft: "27.5%",
                            fontSize: "20px",
                            width: "45%",
                        }}
                        variant="contained"
                    >
                        {" "}
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
