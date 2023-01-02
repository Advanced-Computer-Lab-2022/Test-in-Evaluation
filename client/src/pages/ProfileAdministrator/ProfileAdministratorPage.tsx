import { CSSProperties } from "@mui/styled-engine";
import AddUser from "./AddUser";
import ManageRequests from "./ManageRequests";
import ManageReports from "./ManageReports";
import Discount from "../Discount/Discount";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Refunds from "./Refunds";

function ProfileAdministratorPage() {
    const [optionTab, setOptionTab] = useState("addusers");

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
            </Box>
        </Box>
    );
}

export default ProfileAdministratorPage;
