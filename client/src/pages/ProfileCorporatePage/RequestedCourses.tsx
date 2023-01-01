import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import EnrollmentCard from "./EnrollmentCard";

const RequestedCourses = () => {
    const [pageLoaded, setPageLoaded] = useState<boolean>(false);
    const [courseRequests, setCourseRequests] = useState<any[]>([] as any[]);

    const pageLoad = async () => {
        const pendingCourses = await axios.get(`${apiURL}/get_my_enrollments`, {
            withCredentials: true,
        });

        console.log(pendingCourses);
        setCourseRequests(pendingCourses.data as any[]);
        setPageLoaded(true);
    };

    useEffect(() => {
        pageLoad();
    }, []);

    if (!pageLoaded) return <div>Loading...</div>;
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "80%" }}>
                {courseRequests.map((elm) => {
                    return <EnrollmentCard requestInfo={elm} />;
                })}
            </Box>
        </Box>
    );
};

export default RequestedCourses;
