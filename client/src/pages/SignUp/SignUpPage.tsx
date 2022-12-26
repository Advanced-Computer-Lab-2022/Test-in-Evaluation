import React, { ChangeEvent, useState } from "react";
import {
    TermsOfService,
    PrivacyPolicy,
    ContentOwnershipPolicy,
} from "../../data/policies";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
    Container,
    Divider,
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
        <Container>
            <Snackbar
                autoHideDuration={6000}
                onClose={() =>
                    setSnackbarInfo({
                        ...snackbarInfo,
                        snackbarOpen: false,
                    })
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
                    display: "flex",
                    gap: "3rem",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "1rem",
                    "& > *": {
                        width: "100%",
                    },
                    "& > .img-container": {
                        display: { md: "flex", xs: "none" },
                    },
                }}
            >
                <Box
                    className="img-container"
                    sx={{
                        maxWidth: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <img
                        src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
                        alt=""
                        style={{ display: "block", width: "100%" }}
                    />
                    {/* <Divider /> */}
                    <Typography textAlign="center">
                        {"Already registerd? "}
                        <Link
                            to="/signin"
                            style={{ textDecoration: "none", color: "blue" }}
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Box>
                <form onSubmit={handleSubmission}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Tabs
                                value={userType}
                                onChange={(event, value) => setUserType(value)}
                            >
                                <Tab
                                    label="individual trainee"
                                    value="individual trainee"
                                />
                                <Tab label="instructor" value="instructor" />
                            </Tabs>
                        </Box>

                        <TextField
                            required
                            type="email"
                            variant="outlined"
                            label="Email"
                            value={formInput.email}
                            onChange={(
                                event: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ): void => {
                                setFormInput({
                                    ...formInput,
                                    email: event.target.value,
                                });
                            }}
                        />

                        <TextField
                            required
                            variant="outlined"
                            label="Username"
                            value={formInput.username}
                            onChange={(
                                event: ChangeEvent<
                                    HTMLInputElement | HTMLTextAreaElement
                                >
                            ): void => {
                                setFormInput({
                                    ...formInput,
                                    username: event.target.value,
                                });
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                "& > *": {
                                    width: "100%",
                                },
                            }}
                        >
                            <TextField
                                required
                                variant="outlined"
                                label="First name"
                                value={formInput.firstName}
                                onChange={(
                                    event: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ): void => {
                                    setFormInput({
                                        ...formInput,
                                        firstName: event.target.value,
                                    });
                                }}
                            />
                            <TextField
                                required
                                variant="outlined"
                                label="Last name"
                                value={formInput.lastName}
                                onChange={(
                                    event: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ): void => {
                                    setFormInput({
                                        ...formInput,
                                        lastName: event.target.value,
                                    });
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                "& > *": {
                                    width: "100%",
                                },
                            }}
                        >
                            <TextField
                                required
                                variant="outlined"
                                type="password"
                                label="Password"
                                value={formInput.password}
                                onChange={(
                                    event: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ): void => {
                                    setFormInput({
                                        ...formInput,
                                        password: event.target.value,
                                    });
                                }}
                            />

                            <TextField
                                required
                                variant="outlined"
                                type="password"
                                label="Repeat password"
                                value={formInput.passwordRepeat}
                                onChange={(
                                    event: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ): void => {
                                    setFormInput({
                                        ...formInput,
                                        passwordRepeat: event.target.value,
                                    });
                                }}
                            />
                        </Box>
                        <FormControl>
                            <InputLabel id="gender">Gender *</InputLabel>
                            <Select
                                labelId="gender"
                                label="gender"
                                required
                                onChange={(event, value) => {
                                    setFormInput({
                                        ...formInput,
                                        gender: event.target.value as string,
                                    });
                                }}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography sx={{ fontWeight: "bold" }}>
                            <Checkbox
                                required
                                icon={<CheckCircleOutlineOutlinedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                            />
                            By checking this box you agree to our:
                        </Typography>

                        <Box>
                            <Accordion sx={{ fontSize: "13px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        Terms of Service
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{TermsOfService}</Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ fontSize: "13px" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
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
                                    >
                                        <Typography sx={{ fontWeight: "bold" }}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "black",
                                "&:hover": {
                                    backgroundColor: "#222",
                                },
                            }}
                        >
                            Sign up as {userType}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default SignUpPage;
