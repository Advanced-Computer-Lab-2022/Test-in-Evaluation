import {
    Alert,
    Autocomplete,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import SectionModal from "./SectionModal";
import { useState } from "react";
import { CreateCourseForm } from "./CreateCourseStyles";
import { useEffect } from "react";
import SectionList from "./SectionList";
import { Loader } from "../../components";
import axios from "axios";
import { apiURL } from "../../App";

export type NewSection = {
    title: string;
    description: string;
    totalHours: number;
    videoUrl: string;
    exam: {
        exercises: {
            question: string;
            answers: string[];
            correctAnswer: number;
        }[];
    };
};
type NewCourse = {
    title: string;
    subject: string;
    summary: string;
    videoPreviewUrl: string;
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
    const [videoPreviewURL, setVideoPreviewURL] = useState("");
    const [price, setPrice] = useState(0);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState<NewSection[]>([]);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });

    const getSubjects = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8000/api/get_all_subjects",
                { withCredentials: true }
            );
            setSubjects(res.data);
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
        setLoading(true);
        try {
            const newCourse: NewCourse = {
                title,
                subject,
                summary,
                videoPreviewUrl: videoPreviewURL,
                price,
                sections,
            };
            console.dir(newCourse);
            const res = await axios.post(apiURL + "/create_course", newCourse, {
                withCredentials: true,
            });
            setTitle("");
            setSubject("");
            setSummary("");
            setPrice(0);
            setSections([]);
            setLoading(false);
            setAlert({
                isSuccess: true,
                isError: false,
                message: "Your Course Was Created!",
            });
        } catch (error: any) {
            console.log(error);
            setAlert({
                isSuccess: false,
                isError: true,
                message:
                    (error?.response?.data?.error as string) ||
                    error?.toString() ||
                    "Server Error Please Try Again Later",
            });
            setLoading(false);
        }
    };

    const handleAlertClose = () =>
        setAlert({ isError: false, isSuccess: false, message: "" });

    if (loading) return <Loader open={true} />;
    return (
        <>
            <Snackbar
                open={alert.isSuccess || alert.isError}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alert.isSuccess ? "success" : "error"}
                    variant="filled"
                >
                    {alert.message}
                </Alert>
            </Snackbar>
            <Container maxWidth="lg">
                <CreateCourseForm onSubmit={onSubmit} sx={{ p: "1rem" }}>
                    <TextField
                        variant="outlined"
                        required
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormControl>
                        <Autocomplete
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Subject"
                                    value={subject}
                                    required
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            )}
                            options={subjects.map((subject) => subject.Name)}
                        />
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
                        label="Video Preview URL"
                        value={videoPreviewURL}
                        onChange={(e) => setVideoPreviewURL(e.target.value)}
                    />
                    <TextField
                        required
                        type="number"
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                    <SectionModal setSections={setSections} />
                    <SectionList sections={sections} />
                    <Button type="submit" variant="contained">
                        Add Course
                    </Button>
                </CreateCourseForm>
            </Container>
        </>
    );
};

export default CreateCourse;
