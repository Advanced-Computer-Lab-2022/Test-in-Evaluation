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
                    flexGrow: 1,
                    display: "flex",
                    minHeight: "80vh",
                    // minHeight: "100%",
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
                    <Tab label="Show Reviews" value="instructorReviews" />
                </Tabs>
                {optionTab === "createCourse" && <CreateCourse />}
                {optionTab === "instructorMyReviews" && <InstructorReviews />}
            </Box>
        </Container>
    );
}

export default ProfileInstructorPage;
