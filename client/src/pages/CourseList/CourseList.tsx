import { CourseContainer } from "./CourseListStyles";
import StudentCourseCard from "./StudentCourseCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiURL, UserContext } from "../../App";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Course, Enrollment } from "../../types/Types";

const CourseList = () => {
    const userState = useContext(UserContext);

    const [courses, setCourses] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.post(apiURL + "/get_my_enrollments");
            setCourses(res.data.result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getCourses();
    }, []);
    if (loading) return <div>Loading...</div>;
    return (
        <div>
            {userState.userType === "instructor" ? (
                <div></div>
            ) : (
                <CourseContainer>
                    {courses.map((enrollment) => (
                        <StudentCourseCard
                            enrollment={enrollment}
                            key={enrollment.courseId._id}
                        />
                    ))}
                </CourseContainer>
            )}
        </div>
    );
};

export default CourseList;
