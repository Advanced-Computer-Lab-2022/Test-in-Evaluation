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
import { useState } from "react";
import { CreateCourseForm } from "./CreateCourseStyles";
import { useEffect } from "react";
import axios from "axios";

type NewSection = {
    title: string;
    description: string;
    totalHours: number;
};
type NewCourse = {
    title: string;
    subject: string;
    summary: string;
    price: number;
    sections: NewSection[];
};
type Subject = {
    _id: string;
    Name: string;
};

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState<string>("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState(0);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);

    const getSubjects = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8000/api/get_all_subjects",
                { withCredentials: true }
            );
            setSubjects(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCourse: NewCourse = {
            title,
            subject,
            summary,
            price,
            sections: [
                {
                    title: "Section 1",
                    description: "Section 1 summary",
                    totalHours: 10,
                },
            ],
        };
        console.log(newCourse);
        const res = await axios.post(
            "http://localhost:8000/api/create_course",
            newCourse,
            { withCredentials: true }
        );
        console.log(res);
    };

    if (loading) return <div>Loading...</div>;
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
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        {subjects.map((subject: Subject) => (
                            <MenuItem value={subject.Name} key={subject._id}>
                                {subject.Name}
                            </MenuItem>
                        ))}
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
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                />
                <Button type="submit" variant="contained">
                    Add Course
                </Button>
            </CreateCourseForm>
        </Container>
    );
};

export default CreateCourse;
