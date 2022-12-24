import { Tab, Tabs } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import ReportedProblems from "../Report/ReportedProblems";

const ProfileTraineePage = () => {
    const [optionTab, setOptionTab] = useState("reportedProblems");

    return (
        <Container sx={{ minHeight: "100%" }}>
            <Box
                sx={{
                    background: "white",
                    display: "flex",
                    minHeight: "80vh",
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
                    <Tab label="Reported Problems" value="reportedProblems" />
                </Tabs>
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    {optionTab === "reportedProblems" && <ReportedProblems />}
                </Box>
            </Box>
        </Container>
    );
};

export default ProfileTraineePage;
