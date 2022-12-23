import React, { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import { countries } from "../../data/countries";
import { apiURL } from "../../App";
import { useNavigate, redirect, Link } from "react-router-dom";

import {
    TermsOfService,
    PrivacyPolicy,
    ContentOwnershipPolicy,
} from "../../data/policies";
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
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";

import { UserContext } from "../../App";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { log } from "console";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignInPage() {
    const navigate = useNavigate();
    const userState = useContext(UserContext);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    type InputObject = {
        username: string;
        password: string;
    };

    type SnackbarInformation = {
        snackbarOpen: boolean;
        snackbarText: string;
        snackbarSeverity: AlertColor;
    };

    const [formInput, setFormInput] = useState<InputObject>({} as InputObject);
    const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInformation>(
        {} as SnackbarInformation
    );

    const handleSubmission = (event: any) => {
        event.preventDefault();

        axios
            .post(apiURL + "/login", formInput, { withCredentials: true })
            .then((response) => {
                axios
                    .get(apiURL + "/who_am_i", { withCredentials: true })
                    .then((response) => {
                        userState.setLoggedIn(true);
                        userState.setUserType(response.data.type);
                        userState.setUserInfo(response.data);

                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setSnackbarInfo({
                            snackbarOpen: true,
                            snackbarText: error.response.data.error,
                            snackbarSeverity: "error",
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
                setSnackbarInfo({
                    snackbarOpen: true,
                    snackbarText: error.response.data.error,
                    snackbarSeverity: "error",
                });
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
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
                    display: "flex",
                    marginInline: "3rem",
                    width: "max(75%,25rem)",
                    boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 15px",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    "& > *": {
                        width: "100%",
                    },
                    "& > img": {
                        display: { md: "block", xs: "none" },
                    },
                }}
            >
                <img
                    src="Book1.jpg"
                    style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        maxWidth: "50%",
                    }}
                />

                <Box
                    sx={{
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "1rem",
                        padding: "3rem",
                    }}
                >
                    <Typography
                        fontWeight="bold"
                        fontSize={{ xs: "2rem", md: "2.5rem" }}
                        variant="h2"
                        textAlign="center"
                    >
                        SIGN IN
                    </Typography>

                    <form onSubmit={handleSubmission}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <TextField
                                fullWidth
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

                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password *
                                </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    required
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
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Link to="/forgot_password">Forgot Password?</Link>

                            <Button type="submit" variant="contained" fullWidth>
                                SIGN IN
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default SignInPage;
