import {
    Alert,
    AlertColor,
    Box,
    Button,
    Card,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const RequestCard = (props: any) => {
    const requestInfo = props.requestInfo;
    const rT = props.rT;
    const sRT = props.sRT;
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>();
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        console.log(requestInfo);
    }, []);

    const resolvePendingRequest = (enrollmentId: string) => {
        console.log(enrollmentId);
        axios
            .post(
                `${apiURL}/resolve_pending_enrollment`,
                {
                    enrollmentId: enrollmentId,
                    accepted: true,
                },
                { withCredentials: true }
            )
            .then((response) => {
                setOpen(true);
                setSnackbarMessage("Successfully Granted Request");
                setSnackbarSeverity("success");
                sRT(!rT);
            })
            .catch((error) => {
                setOpen(true);
                setSnackbarMessage("error occurred: " + error);
                setSnackbarSeverity("error");
                sRT(!rT);
            });
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Box sx={{ width: "70%" }}>
            <Card sx={{ padding: "1em" }}>
                <Typography sx={{ fontSize: "2em", fontWeight: "bold" }}>
                    Course: {requestInfo?.courseId?.title}
                </Typography>
                <Typography>
                    Trainee username: {requestInfo?.studentId?.username}
                </Typography>
                <Typography color="text.secondary">
                    Request Date: {requestInfo?.paymentDate}
                </Typography>
                <Typography sx={{ color: "#cc4466" }} gutterBottom>
                    Status: {requestInfo?.status}
                </Typography>
                <Box sx={{ float: "right" }}>
                    <Button
                        onClick={() => {
                            resolvePendingRequest(requestInfo?._id);
                        }}
                        variant="contained"
                    >
                        Grant Access
                    </Button>
                </Box>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={handleClose}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RequestCard;
