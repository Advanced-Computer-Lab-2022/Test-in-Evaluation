import { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { NewSection } from "./CreateCourse";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max(20rem, 50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
};

type SectionFunction = (newSection: NewSection[]) => NewSection[];

type props = {
    setSections: (a: SectionFunction) => void;
};
const SectionModal = ({ setSections }: props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [totalHours, setTotalHours] = useState<number>(0);

    const onSubmit = () => {
        const newSection: NewSection = {
            title,
            description,
            totalHours,
        };
        setSections((oldSections) => [...oldSections, newSection]);
        setTitle("");
        setDescription("");
        setTotalHours(0);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" fullWidth>
                Add Section
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        fullWidth
                        label="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        required
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Total Hours"
                        type="number"
                        required
                        value={totalHours}
                        onChange={(e) =>
                            setTotalHours(parseInt(e.target.value) || 0)
                        }
                    />
                    <Button variant="contained" onClick={onSubmit} fullWidth>
                        Add Section
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default SectionModal;
