import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../App";
import { CourseWithSections } from "../../types/Types";
import { Toast } from "../../components";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

type Props = {
    id: string | undefined;
};
const ReportModal = ({ id }: Props) => {
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [type, setType] = React.useState("technical");
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            await axios.post(
                `${apiURL}/report_problem`,
                {
                    title: data.get("Title"),
                    description: data.get("Description"),
                    category: type,
                    courseId: id,
                },
                { withCredentials: true }
            );
            setAlert({
                isSuccess: true,
                isError: false,
                message: "Your report has been recorded",
            });
            handleClose();
        } catch (error) {
            setAlert({
                isSuccess: false,
                isError: true,
                message:
                    ((error as AxiosError)?.response?.data as string) ||
                    error?.toString() ||
                    "Server Error Please Try Again Later",
            });
        }
    };

    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Button
                variant="contained"
                size="large"
                sx={{ width: "100%" }}
                color="error"
                onClick={handleOpen}
            >
                Report Problem
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            Report a problem with this course
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="Title"
                            name="Title"
                        />
                        <TextField
                            variant="outlined"
                            label="Description"
                            name="Description"
                            multiline
                        />
                        <FormControl fullWidth>
                            <InputLabel id="Type">Type</InputLabel>
                            <Select
                                labelId="Type"
                                label="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="technical">Technical</MenuItem>
                                <MenuItem value="financial">Financial</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" color="error" variant="contained">
                            Report
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ReportModal;
