import { CourseContainer } from "./CourseListStyles";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../../global";

const CourseList = () => {
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
        <CourseContainer>
            {courses.map((course) => (
                <CourseCard course={course} key={course._id} />
            ))}
        </CourseContainer>
    );
};

export default CourseList;
