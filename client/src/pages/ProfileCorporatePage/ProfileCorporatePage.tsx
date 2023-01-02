import { Button, Tab, Tabs } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportedProblems from "../Report/ReportedProblems";
import RequestedCourses from "./RequestedCourses";

const ProfileCorporatePage = () => {
    const navigate = useNavigate();
    const [optionTab, setOptionTab] = useState("requestedCourses");

    return (
        <Box
            sx={{
                background: "white",
                display: "flex",
                minHeight: "calc(100% + 1rem)",
                translate: "0 -1rem 0",
            }}
        >
            <Tabs
                sx={{
                    paddingY: "2.5rem",
                    borderRight: 1,
                    borderColor: "divider",
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 15px",
                }}
                value={optionTab}
                orientation="vertical"
                onChange={(event, value) => {
                    setOptionTab(value);
                }}
            >
                <Tab label="Course Requests" value="requestedCourses" />
                <Tab label="Reported Problems" value="reportedProblems" />
                <Button
                    onClick={() => {
                        navigate("/change_password");
                    }}
                    sx={{ float: "down" }}
                    variant="contained"
                >
                    Change Password
                </Button>
            </Tabs>
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    border: "1px solid #e0e0e0",
                }}
            >
                {optionTab === "requestedCourses" && <RequestedCourses />}
                {optionTab === "reportedProblems" && <ReportedProblems />}
            </Box>
        </Box>
    );
};

export default ProfileCorporatePage;
