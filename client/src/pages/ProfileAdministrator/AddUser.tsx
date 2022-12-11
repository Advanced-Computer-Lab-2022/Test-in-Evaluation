import { ChangeEvent, useState } from "react";
import { countries } from "../../data/countries";

import {
    Box,
    Typography,
    MenuItem,
    InputLabel,
    Select,
    Autocomplete,
    TextField,
    Button,
    Tab,
    Tabs,
    Snackbar,
    Alert,
    AlertColor,
} from "@mui/material";

import axios from "axios";
import { apiURL } from "../../App";
function AddUser() {
    type InputObject = {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        gender: string;
        country: string;
        passwordRepeat: string;
    };

    type SnackbarInformation = {
        snackbarOpen: boolean;
        snackbarText: string;
        snackbarSeverity: AlertColor;
    };

    const [userType, setUserType] = useState("Admin");
    const [formInput, setFormInput] = useState<InputObject>({} as InputObject);
    const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInformation>(
        {} as SnackbarInformation
    );

    const handleSubmission = (event: any) => {
        event.preventDefault();

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
            const type =
                userType === "Admin"
                    ? "admin"
                    : userType === "Instructor"
                    ? "instructor"
                    : "corporateTrainee";

            axios
                .post(
                    apiURL + "/create_user",
                    { ...formInput, type },
                    { withCredentials: true }
                )
                .then((response) => {
                    setSnackbarInfo({
                        snackbarOpen: true,
                        snackbarText: "Successfully added " + userType,
                        snackbarSeverity: "success",
                    });
                })
                .catch((error) => {
                    setSnackbarInfo({
                        snackbarOpen: true,
                        snackbarText: error.response.data.error,
                        snackbarSeverity: "error",
                    });
                });
        }
    };

    return (
        <Box sx={{ width: "100%", paddingY: "10px" }}>
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
            <form style={{ height: "100%" }} onSubmit={handleSubmission}>
                <Box
                    sx={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                        height: "96%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.0) 0px 5px 15px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tabs
                            sx={{ borderRadius: "25px" }}
                            value={userType}
                            onChange={(event, value) => setUserType(value)}
                        >
                            <Tab label="admin" value="Admin" />
                            <Tab label="instructor" value="Instructor" />
                            <Tab
                                label="corporate trainee"
                                value="Corporate Trainee"
                            />
                        </Tabs>
                    </Box>

                    <Box
                        sx={{
                            paddingX: "60px",
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
                                    HTMLInputElement | HTMLTextAreaElement
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
                            paddingX: "60px",
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
                                    HTMLInputElement | HTMLTextAreaElement
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
                            paddingX: "60px",
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
                                        HTMLInputElement | HTMLTextAreaElement
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
                    </Box>

                    <Box
                        sx={{
                            paddingX: "60px",
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
                                        HTMLInputElement | HTMLTextAreaElement
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
                    </Box>

                    <Box sx={{ paddingX: "60px" }}>
                        <InputLabel>
                            {" "}
                            <Typography> Gender *</Typography>
                        </InputLabel>
                        <Select
                            required
                            sx={{ width: "100%" }}
                            value={formInput.gender}
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
                    </Box>

                    <Box sx={{ height: "100%" }} />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Button type="submit" variant="contained">
                            {" "}
                            Add {userType}{" "}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default AddUser;
