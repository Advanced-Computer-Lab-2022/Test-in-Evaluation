import React, { ChangeEvent, useState } from "react";
import { countries } from "../../data/countries";
import {
    TermsOfService,
    PrivacyPolicy,
    ContentOwnershipPolicy,
} from "../../data/policies";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../App";
import {
    Alert,
    Autocomplete,
    Box,
    Tabs,
    Tab,
    ToggleButtonGroup,
    ToggleButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Checkbox,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    AlertColor,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

function SignUpPage() {
    type InputObject = {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        gender: string;
        passwordRepeat: string;
        acceptPolicies: boolean;
    };

    type SnackbarInformation = {
        snackbarOpen: boolean;
        snackbarText: string;
        snackbarSeverity: AlertColor;
    };

    const navigate = useNavigate();
    const [userType, setUserType] = useState("individual trainee");
    const [formInput, setFormInput] = useState<InputObject>({} as InputObject);
    const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInformation>(
        {} as SnackbarInformation
    );

    const handleSubmission = (event: any) => {
        event.preventDefault();

        console.log(formInput);

        if (formInput.password.length < 8) {
            setSnackbarInfo({
                snackbarOpen: true,
                snackbarText: "Password length should at least be 8",
                snackbarSeverity: "error",
            });
        } else if (formInput.password !== formInput.passwordRepeat) {
            setSnackbarInfo({
                snackbarOpen: true,
                snackbarText: "Password is not correctly repeated",
                snackbarSeverity: "error",
            });
        } else {
            //CALL API HERE!!!

            axios
                .post(apiURL + "/sign_up", formInput, { withCredentials: true })
                .then((response) => {
                    console.log(response);
                    navigate("/signin");
                })
                .catch((error) => {
                    setSnackbarInfo({
                        snackbarOpen: true,
                        snackbarText: error.response.data.error,
                        snackbarSeverity: "error",
                    });
                    console.log(error);
                });
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Snackbar
                autoHideDuration={6000}
                onClose={() =>
                    setSnackbarInfo({ ...snackbarInfo, snackbarOpen: false })
                }
                open={snackbarInfo.snackbarOpen}
            >
                <Alert
                    variant="filled"
                    severity={snackbarInfo.snackbarSeverity}
                >
                    <Typography>{snackbarInfo.snackbarText}</Typography>
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 15px",
                    background: "white",
                    width: "800px",
                }}
            >
                <Box sx={{ width: "100%", height: "100%", paddingY: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography
                            sx={{ fontWeight: "bold", fontSize: "45px" }}
                        >
                            SIGN UP
                        </Typography>
                    </Box>
                    <form
                        style={{ height: "100%" }}
                        onSubmit={handleSubmission}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "20px",
                                flexDirection: "column",
                                height: "90%",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Tabs
                                    sx={{ borderRadius: "25px" }}
                                    value={userType}
                                    onChange={(event, value) =>
                                        setUserType(value)
                                    }
                                >
                                    <Tab
                                        label="individual trainee"
                                        value="individual trainee"
                                    />
                                    <Tab
                                        label="instructor"
                                        value="instructor"
                                    />
                                </Tabs>
                            </Box>

                            <Box
                                sx={{
                                    paddingX: "80px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    sx={{ width: "100%" }}
                                    required
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    value={formInput.email}
                                    onChange={(
                                        event: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ): void => {
                                        setFormInput({
                                            ...formInput,
                                            email: event.target.value,
                                        });
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    paddingX: "80px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    sx={{ width: "100%" }}
                                    required
                                    variant="outlined"
                                    label="Username"
                                    value={formInput.username}
                                    onChange={(
                                        event: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ): void => {
                                        setFormInput({
                                            ...formInput,
                                            username: event.target.value,
                                        });
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    paddingX: "80px",
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "10px",
                                }}
                            >
                                <Box sx={{ width: "100%" }}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        required
                                        variant="outlined"
                                        label="First name"
                                        value={formInput.firstName}
                                        onChange={(
                                            event: ChangeEvent<
                                                | HTMLInputElement
                                                | HTMLTextAreaElement
                                            >
                                        ): void => {
                                            setFormInput({
                                                ...formInput,
                                                firstName: event.target.value,
                                            });
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        required
                                        variant="outlined"
                                        label="Last name"
                                        value={formInput.lastName}
                                        onChange={(
                                            event: ChangeEvent<
                                                | HTMLInputElement
                                                | HTMLTextAreaElement
                                            >
                                        ): void => {
                                            setFormInput({
                                                ...formInput,
                                                lastName: event.target.value,
                                            });
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    paddingX: "80px",
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "10px",
                                }}
                            >
                                <Box sx={{ width: "100%" }}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        required
                                        variant="outlined"
                                        type="password"
                                        label="Password"
                                        value={formInput.password}
                                        onChange={(
                                            event: ChangeEvent<
                                                | HTMLInputElement
                                                | HTMLTextAreaElement
                                            >
                                        ): void => {
                                            setFormInput({
                                                ...formInput,
                                                password: event.target.value,
                                            });
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        required
                                        variant="outlined"
                                        type="password"
                                        label="Repeat password"
                                        value={formInput.passwordRepeat}
                                        onChange={(
                                            event: ChangeEvent<
                                                | HTMLInputElement
                                                | HTMLTextAreaElement
                                            >
                                        ): void => {
                                            setFormInput({
                                                ...formInput,
                                                passwordRepeat:
                                                    event.target.value,
                                            });
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ paddingX: "80px" }}>
                                <InputLabel>
                                    {" "}
                                    <Typography> Gender *</Typography>
                                </InputLabel>
                                <Select
                                    required
                                    sx={{ width: "100%" }}
                                    onChange={(event, value) => {
                                        setFormInput({
                                            ...formInput,
                                            gender: event.target
                                                .value as string,
                                        });
                                    }}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </Box>

                            <Box sx={{ paddingX: "80px" }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    <Checkbox required />
                                    By checking this box you agree to our:
                                </Typography>
                            </Box>
                            <Box sx={{ paddingX: "80px" }}>
                                <Accordion sx={{ fontSize: "13px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ height: "10px" }}
                                    >
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Terms of Service
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {TermsOfService}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ fontSize: "13px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{ height: "10px" }}
                                    >
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            Privacy Policy
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{PrivacyPolicy}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {userType === "instructor" && (
                                    <Accordion sx={{ fontSize: "13px" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            sx={{ height: "10px" }}
                                        >
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Content Ownership Policy
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {ContentOwnershipPolicy}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    sx={{ height: "60px", width: "300px" }}
                                    type="submit"
                                    variant="contained"
                                >
                                    {" "}
                                    Sign up as {userType}{" "}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUpPage;
