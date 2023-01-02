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

        setCourseRequests(pendingCourses.data as any[]);
        setPageLoaded(true);
    };

    useEffect(() => {
        pageLoad();
    }, []);

    if (!pageLoaded) return <div>Loading...</div>;
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    flexBasis: "33.333%",
                    flexWrap: "wrap",
                    padding: "1em",
                }}
            >
                {courseRequests.map((elm) => {
                    return <EnrollmentCard requestInfo={elm} />;
                })}
            </Box>
        </Box>
    );
};

export default RequestedCourses;
