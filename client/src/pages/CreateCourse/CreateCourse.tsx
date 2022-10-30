import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { CreateCourseForm } from "./CreateCourseStyles";

const CreateCourse = () => {
    const [title, setTitle] = useState("");

    const [subject, setSubject] = useState<string>("Web Development");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState(0);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCourse = {
            title,
            subject,
            summary,
            price,
        };
        console.log(newCourse);
    };
    return (
        <Container maxWidth="lg">
            <CreateCourseForm onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    required
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <FormControl>
                    <InputLabel>Subject</InputLabel>
                    <Select
                        required
                        value={subject}
                        label="Subject"
                        onChange={(e) => setSubject(e.target.value as string)}
                    >
                        <MenuItem value={"Web Development"}>
                            Web Development
                        </MenuItem>
                        <MenuItem value={"Mobile"}>Mobile</MenuItem>
                        <MenuItem value={"Data Science"}>DataScience</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    multiline
                    label="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <TextField
                    required
                    type="number"
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <Button type="submit" variant="contained">
                    Add Course
                </Button>
            </CreateCourseForm>
        </Container>
    );
};

export default CreateCourse;
