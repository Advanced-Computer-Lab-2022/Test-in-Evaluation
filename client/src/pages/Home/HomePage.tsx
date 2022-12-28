import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActionArea,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import { Loader } from "../../components";
import { Course } from "../../types/Types";
import HomeCourseCard from "./HomeCourseCard";
import { useNavigate } from "react-router-dom";
import {
    HeroSection,
    Dot,
    LandingContainer,
    InstructorImage,
} from "./HomeStyles";

function HomePage() {
    const navigate = useNavigate();
    const [mostPopularCourses, setMostPopularCourses] = useState<Course[]>([]);
    const [instructors, setInstructors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const getMostPopularCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiURL}/search_courses`);
            setMostPopularCourses(
                (response.data.result as Course[])
                    .sort((a, b) => b.viewsCount - a.viewsCount)
                    .slice(0, 3)
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const getAllInstructors = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}/get_all_instructors`);
            setInstructors(response.data.slice(0, 3));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const onLoad = async () => {
        Promise.all([getMostPopularCourses(), getAllInstructors()]);
    };

    useEffect(() => {
        onLoad();
    }, []);
    if (loading) return <Loader open={loading} />;
    return (
        <LandingContainer>
            <HeroSection>
                <Dot sx={{ top: "90%" }} />
                <Dot sx={{ top: "75%", left: "1%", scale: "0.5" }} />
                <Dot sx={{ top: "83%", left: "4%", scale: "0.2" }} />
                <Box>
                    <Typography variant="h3">Build Your Skill</Typography>
                    <Typography variant="h3">Advance Your Career</Typography>
                    <Typography variant="h6" fontWeight={400}>
                        Choose your favorite course and start learning
                    </Typography>
                    <Box sx={{ mt: "1rem", display: "flex", gap: "1rem" }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/signup")}
                        >
                            Start Now
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/search")}
                        >
                            Our Courses
                        </Button>
                    </Box>
                </Box>
                <Box
                    className="landing-image"
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                    }}
                >
                    <img
                        src="/landing.png"
                        alt=""
                        style={{
                            display: "block",
                            width: "75%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </HeroSection>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}
            >
                <Typography variant="h4">Popular Courses:</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "3rem",
                        "& > *": {
                            flex: 1,
                        },
                    }}
                >
                    {mostPopularCourses.map((course) => (
                        <HomeCourseCard course={course} key={course._id} />
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                    }}
                >
                    <Typography variant="h4">Our Instructors:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "3rem",
                            "& > *": {
                                flex: 1,
                            },
                        }}
                    >
                        {instructors.map((instructor: any) => (
                            <Card
                                sx={{
                                    "&:hover img": {
                                        boxShadow: "0 0 0 100vmax #eee",
                                    },
                                }}
                                onClick={() =>
                                    navigate(`/instructor/${instructor._id}`)
                                }
                            >
                                <CardActionArea
                                    sx={{
                                        "& > .MuiCardActionArea-focusHighlight":
                                            {
                                                display: "none",
                                            },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "1rem",
                                        }}
                                    >
                                        <InstructorImage
                                            src={
                                                instructor.gender == "male"
                                                    ? "/man.jpg"
                                                    : "/woman.jpg"
                                            }
                                            alt=""
                                        />
                                        <Typography variant="h4">
                                            {instructor.firstName}
                                        </Typography>
                                        <Typography>
                                            {instructor.bio}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </LandingContainer>
    );
}

export default HomePage;
