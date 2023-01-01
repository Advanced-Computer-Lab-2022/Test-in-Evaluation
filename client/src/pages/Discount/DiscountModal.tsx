import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Toast } from "../../components";
import axios from "axios";
import { apiURL } from "../../App";
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
    courses: {
        courseId: string;
        isSelected: boolean;
    }[];
};
const DiscountModal = ({ courses }: Props) => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const discount = parseInt(data.get("discount") as string);
        const startTime = new Date(data.get("startTime") as any).getTime();
        const endTime = new Date(data.get("endTime") as any).getTime();
        const selectedCourses = courses.filter((course) => course.isSelected);
        if (0 > discount || discount > 100) {
            setAlert({
                isSuccess: false,
                isError: true,
                message: "Discount must be between 0 and 100",
            });
            return;
        }
        if (selectedCourses.length === 0) {
            setAlert({
                isSuccess: false,
                isError: true,
                message: "Please select at least one course",
            });
            return;
        }
        selectedCourses.forEach(async (course) => {
            axios.post(
                apiURL + "/set_course_discount",
                {
                    courseId: course.courseId,
                    discount: discount / 100,
                    startDateTimestamp: startTime,
                    endDateTimestamp: endTime,
                },
                {
                    withCredentials: true,
                }
            );
        });
    };
    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                    width: "max(50%, 5rem)",
                }}
            >
                Add Discount
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
                            gap: "1rem",
                        }}
                    >
                        <TextField
                            type="number"
                            label="Discount Percentage"
                            name="discount"
                            required
                        />
                        <TextField
                            type="date"
                            label="Start Time"
                            name="startTime"
                            required
                        />
                        <TextField
                            type="date"
                            label="End Time"
                            name="endTime"
                            required
                        />
                        <Button type="submit" variant="contained">
                            Create Discount
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default DiscountModal;
