import { useContext, useEffect, useState } from "react";
import { Course } from "../../types/Types";
import axios from "axios";
import { apiURL, UserContext } from "../../App";
import { Loader, Toast } from "../../components";
import { Box } from "@mui/system";
import { Card, CardContent, Typography } from "@mui/material";

type CourseRevenue = {
    courseId: string;
    revenue: number;
    buys: number;
};

const CourseSales = () => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [revenue, setRevenue] = useState<CourseRevenue[]>([]);
    const { userInfo } = useContext(UserContext);

    const getCourseRevenue = async (course: Course) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiURL}/get_enrollment_aggregation`,
                {
                    courseId: course._id,
                },
                { withCredentials: true }
            );
            const revenue = response.data.sum;
            const buys = response.data.count;
            setLoading(false);
            return { revenue, buys };
        } catch (error) {
            setLoading(false);
            console.log(error);
            setAlert({
                isSuccess: false,
                isError: true,
                message: "An Error Occurred while fetching course revenue",
            });
        }
    };
    const getAllCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiURL}/search_courses`, {
                instructor: userInfo.user.username,
            });
            setCourses(response.data.result);
            const courseRevenues = await Promise.all(
                response.data.result.map(async (course: Course) => {
                    const courseRevenue = await getCourseRevenue(course);
                    return {
                        courseId: course._id,
                        revenue: courseRevenue?.revenue,
                        buys: courseRevenue?.buys,
                    };
                })
            );
            setRevenue(courseRevenues);
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

    const courseRevenueMap: any = courses.reduce(
        (acc, course) => ({
            ...acc,
            [course._id]: revenue.find((rev) => rev.courseId === course._id),
        }),
        {}
    );

    const totalRevenue = revenue.reduce((acc, rev) => acc + rev.revenue, 0);

    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Typography variant="h4">
                Total Revenue: <strong>{totalRevenue}</strong>
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, 20rem)",
                    gap: "1rem",
                }}
            >
                {courses.map((course) => {
                    const revenue = courseRevenueMap[course._id];
                    console.log(revenue);

                    return (
                        <Card>
                            <CardContent>
                                <h3>{course.title}</h3>
                                <p>Revenue: {revenue?.revenue}</p>
                                <p>Total Purchases: {revenue?.buys}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        </>
    );
};

export default CourseSales;
