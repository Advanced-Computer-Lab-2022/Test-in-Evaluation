import { useContext, useEffect, useState } from "react";
import { apiURL } from "../../App";
import axios from "axios";
import { Course } from "../../types/Types";
import { Loader, Toast } from "../../components";
import SelectCourseCard from "./SelectCourseCard";
import { Box, grid } from "@mui/system";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Typography,
} from "@mui/material";
import DiscountModal from "./DiscountModal";
import { UserContext } from "../../App";
import { userInfo } from "os";

type SelectedCourses = {
    courseId: string;
    isSelected: boolean;
};

const Discount = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourses[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });

    const { userType, userInfo } = useContext(UserContext);
    console.log(userInfo);
    const getAllCourses = async () => {
        try {
            setLoading(true);

            const response = await axios.post(`${apiURL}/search_courses`);
            let res: Course[] = response.data.result;

            if (userType === "instructor") {
                res = res.filter((course: Course) => {
                    return (
                        course.instructor._id === (userInfo.user._id as string)
                    );
                });
            }
            setCourses(res);
            setSelectedCourses(
                res.map((course) => ({
                    courseId: course._id,
                    isSelected: false,
                }))
            );

            setLoading(false);
        } catch (error) {
            setAlert({
                isSuccess: false,
                isError: true,
                message: "An Error Occurred while fetching courses",
            });
            console.log(error);

            setLoading(false);
        }
    };
    useEffect(() => {
        getAllCourses();
    }, []);

    if (loading) return <Loader open={loading} />;
    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "3rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h4">
                        Select Courses To Add Discount:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, 20rem)",
                        gap: "3rem",
                    }}
                >
                    {courses.length === 0 ? (
                        <Typography>There are no courses to show</Typography>
                    ) : (
                        courses.map((course, index) => (
                            <SelectCourseCard
                                key={course._id}
                                course={{
                                    ...course,
                                    isSelected:
                                        selectedCourses[index].isSelected,
                                }}
                                setSelected={setSelectedCourses}
                            />
                        ))
                    )}
                </Box>
                <DiscountModal courses={selectedCourses} />
            </Box>
        </>
    );
};

export default Discount;
