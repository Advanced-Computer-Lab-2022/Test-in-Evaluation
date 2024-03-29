import { Box, Tab, Tabs, Container, Input, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../App";
import CreateCourse from "../CreateCourse/CreateCourse";
import Discount from "../Discount/Discount";
import InstructorReviews from "../InstructorReviews/InstructorReviews";
import ReportedProblems from "../Report/ReportedProblems";
import CourseSales from "./CourseSales";
import InstructorCoursesView from "./InstructorCoursesView";
function ProfileInstructorPage() {
    const navigate = useNavigate();
    const [optionTab, setOptionTab] = useState("profileSettings");
    const [bioValue, setBioValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

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
                <Tab label="Profile Settings" value="profileSettings" />
                <Tab label="Create a new course" value="createCourse" />
                <Tab label="View my courses" value="viewMyCourses" />
                <Tab label="Show My Reviews" value="instructorReviews" />
                <Tab label="Reported Problems" value="reportedProblems" />
                <Tab label="Create Discount" value="addDiscount" />
                <Tab label="Course Sales" value="courseSales" />
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
            <Box sx={{ flexGrow: 1, p: 2, border: "1px solid #ccc" }}>
                {optionTab === "profileSettings" && (
                    <Box>
                        <h1>Profile Settings</h1>
                        <Input
                            sx={{ width: "100%" }}
                            value={emailValue}
                            placeholder="Email"
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <Input
                            sx={{ width: "100%", marginTop: "20px" }}
                            placeholder="Bio"
                            multiline
                            value={bioValue}
                            onChange={(e) => setBioValue(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{ marginTop: "20px" }}
                            onClick={() => {
                                axios
                                    .post(
                                        apiURL + "/change_my_profile",
                                        {
                                            bio: bioValue,
                                            email: emailValue,
                                        },
                                        { withCredentials: true }
                                    )
                                    .then((res) => {
                                        if (res.data.success)
                                            alert("Profile updated!");
                                    });
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                )}
                {optionTab === "createCourse" && <CreateCourse />}
                {optionTab === "viewMyCourses" && <InstructorCoursesView />}
                {optionTab === "instructorReviews" && <InstructorReviews />}
                {optionTab === "reportedProblems" && <ReportedProblems />}
                {optionTab === "addDiscount" && <Discount />}
                {optionTab === "courseSales" && <CourseSales />}
            </Box>
        </Box>
    );
}

export default ProfileInstructorPage;
