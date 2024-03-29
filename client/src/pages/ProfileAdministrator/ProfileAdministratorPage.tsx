import { CSSProperties } from "@mui/styled-engine";
import AddUser from "./AddUser";
import ManageRequests from "./ManageRequests";
import ManageReports from "./ManageReports";
import Discount from "../Discount/Discount";
import GrantCourseAccess from "./GrantCourseAccess";
import { useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Refunds from "./Refunds";
import { useNavigate } from "react-router-dom";

function ProfileAdministratorPage() {
    const [optionTab, setOptionTab] = useState("addusers");
    const navigate = useNavigate();
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
                <Tab label="manage trainee requests" value="managetrainee" />
                <Tab label="Create Discount" value="addDiscount" />
                <Tab label="manage problem reports" value="managereports" />
                <Tab label="Manage Refund Requests" value="manageRefunds" />
                <Tab label="Grant Course Access" value="grantAccess" />
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
                {optionTab === "addusers" && <AddUser />}
                {optionTab === "managetrainee" && <ManageRequests />}
                {optionTab === "addDiscount" && <Discount />}
                {optionTab === "managereports" && <ManageReports />}
                {optionTab === "manageRefunds" && <Refunds />}
                {optionTab === "grantAccess" && <GrantCourseAccess />}
            </Box>
        </Box>
    );
}

export default ProfileAdministratorPage;
