import { CourseContainer } from "./CourseListStyles";
import CourseCard from "./CourseCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../../global";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const CourseList = () => {

    const [viewMyCoursesOnly, setViewMyCoursesOnly] = useState(false);

    const userState = useContext(UserContext);

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8000/api/search_courses"
            );
            console.log(res.data.result);
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
        {userState.userType === "instructor" && (<div>
            <FormControlLabel control={<Checkbox value={viewMyCoursesOnly} onChange={(e, v) => setViewMyCoursesOnly(v)} />} label="View My Courses Only" />
        </div>)}
        <CourseContainer>
            {courses.map((course) => (
                <CourseCard course={course} key={course._id} />
            ))}
        </CourseContainer>
        </div>
    );
};

export default CourseList;
