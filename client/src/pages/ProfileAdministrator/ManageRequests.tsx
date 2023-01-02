import { Box, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import RequestCard from "./RequestCard";
import CloseIcon from "@mui/icons-material/Close";

function ManageRequests() {
    const [pageLoaded, setPageLoaded] = useState<boolean>();
    const [courseRequests, setCourseRequests] = useState<any[]>([] as any[]);
    const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

    const onPageLoad = async () => {
        const pendingRequests = await axios.get(
            `${apiURL}/get_pending_enrollments`,
            {
                withCredentials: true,
            }
        );
        setCourseRequests(pendingRequests.data as any[]);
        setPageLoaded(true);
    };

    useEffect(() => {
        onPageLoad();
    }, [refreshToggle]);

    if (!pageLoaded) return <div>Loading...</div>;
    return (
        <Box sx={{ width: "100%" }}>
            {courseRequests.length === 0 && (
                <Typography variant="h6">No Requests Yet</Typography>
            )}

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
                    return (
                        <RequestCard
                            rT={refreshToggle}
                            sRT={setRefreshToggle}
                            requestInfo={elm}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

export default ManageRequests;
