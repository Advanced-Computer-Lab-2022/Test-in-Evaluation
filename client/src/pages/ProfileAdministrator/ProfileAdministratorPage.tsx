import { CSSProperties } from "@mui/styled-engine";
import AddUser from "./AddUser";
import ManageRequests from "./ManageRequests";
import ManageCourses from "./ManageCourses";
import ManageReports from "./ManageReports";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

function ProfileAdministratorPage() {
    const [optionTab, setOptionTab] = useState("addusers");

    return (
        <Box
            style={{
                background: "white",
                boxShadow: "rgba(0, 0, 0, 0.50) 0px 5px 15px",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    height: "100%",
                    gap: "2rem",
                }}
            >
                <Tabs
                    sx={{
                        paddingY: "40px",
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
                    <Tab label="add new users" value="addusers" />
                    <Tab
                        label="manage trainee requests"
                        value="managetrainee"
                    />
                    <Tab label="manage courses" value="managecourses" />
                    <Tab label="manage problem reports" value="managereports" />
                </Tabs>
                {optionTab === "addusers" && <AddUser />}
                {optionTab === "managetrainee" && <ManageRequests />}
                {optionTab === "managecourses" && <ManageCourses />}
                {optionTab === "managereports" && <ManageReports />}
            </Box>
        </Box>
    );
}

export default ProfileAdministratorPage;
