import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const EnrollmentCard = (props: any) => {
    const requestInfo = props.requestInfo;

    useEffect(() => {
        console.log("bruh");
    }, []);

    return (
        <Box>
            <Box>
                <Typography>{requestInfo?.subjectId?.title}</Typography>
            </Box>
        </Box>
    );
};

export default EnrollmentCard;
