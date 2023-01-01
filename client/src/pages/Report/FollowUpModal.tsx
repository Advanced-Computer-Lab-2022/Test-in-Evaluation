import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormEvent, useState, useContext } from "react";
import { TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../App";
import { Loader, Toast } from "../../components";
import { Problem } from "./ProblemCard";
import { UserContext } from "../../App";
import CommentsSection from "./CommentsSection";
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max(50%, 25rem)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export type Comment = {
    _id?: string;
    text: string;
    senderId: string;
};
type props = {
    problem: Problem;
};
const FollowUpModal = ({ problem }: props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<Comment[]>(problem.comments || []);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const { userInfo } = useContext(UserContext);
    const userId = userInfo.user._id;
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData(e.currentTarget);
            const message = data.get("FollowUp");
            await axios.post(apiURL + "/follow_up_on_reported_problem", {
                newComment: message,
                reportedProblemId: problem._id,
                userId: problem.user,
            });
            setComments((prev) => [
                ...prev,
                {
                    text: message as string,
                    senderId: userId,
                    id: prev.length,
                },
            ]);
            setLoading(false);
            setAlert({
                isSuccess: true,
                isError: false,
                message: "Follow Up Has Been Recorded",
            });
        } catch (error) {
            setLoading(false);
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

    if (loading) return <Loader open={loading} />;
    console.log(userInfo);

    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Button onClick={handleOpen} variant="contained" color="warning">
                Follow Up
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
                        <Typography>Problem isn't resolved?</Typography>
                        <CommentsSection comments={comments} userId={userId} />
                        <TextField
                            name="FollowUp"
                            label="Follow Up Message"
                            multiline
                            required
                        />
                        <Button
                            type="submit"
                            color="warning"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FollowUpModal;
