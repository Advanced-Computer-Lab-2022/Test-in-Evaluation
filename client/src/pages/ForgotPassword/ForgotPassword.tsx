import { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import { apiURL } from "../../App";
import { useNavigate, redirect, Link } from "react-router-dom";

import {
    Alert,
    Box,
    Snackbar,
    Button,
    TextField,
    Typography,
    AlertColor,
} from "@mui/material";

import { UserContext } from "../../App";

function ForgotPassword() {
    const navigate = useNavigate();
    const userState = useContext(UserContext);

    type InputObject = {
        email: string;
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
            .post(apiURL + "/forgot_password", formInput, {
                withCredentials: true,
            })
            .then((response) => {
                setSnackbarInfo({
                    snackbarOpen: true,
                    snackbarText: "Email Sent",
                    snackbarSeverity: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                setSnackbarInfo({
                    snackbarOpen: true,
                    snackbarText: error.response.data,
                    snackbarSeverity: "error",
                });
            });
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
                    backgroundColor: "white",
                    width: "800px",
                }}
            >
                <Box sx={{ width: "100%", height: "100%", paddingY: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography
                            sx={{ fontWeight: "bold", fontSize: "45px" }}
                        >
                            SIGN IN
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmission}>
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
                            ></Box>
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
                                    Reset Password{" "}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
