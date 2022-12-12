import { Box, Tab, Tabs, Container } from "@mui/material";
import { useState } from "react";
import CreateCourse from "../CreateCourse/CreateCourse";
import InstructorReviews from "../InstructorReviews/InstructorReviews";
function ProfileInstructorPage() {
    const [optionTab, setOptionTab] = useState("createCourse");
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
                    <Tab label="Create a new course" value="createCourse" />
                    <Tab label="Show My Reviews" value="instructorReviews" />
                </Tabs>
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    {optionTab === "createCourse" && <CreateCourse />}
                    {optionTab === "instructorReviews" && <InstructorReviews />}
                </Box>
            </Box>
        </Container>
    );
}

export default ProfileInstructorPage;
