import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";

const EnrollmentCard = (props: any) => {
    const requestInfo = props.requestInfo;

    useEffect(() => {
        console.log(requestInfo);
    }, []);

    return (
        <Box sx={{ width: "70%" }}>
            <Card sx={{ padding: "1em" }}>
                <Typography sx={{ fontSize: "2em", fontWeight: "bold" }}>
                    {requestInfo?.courseId?.title}
                </Typography>
                <Typography color="text.secondary">
                    Request Date: {requestInfo?.paymentDate}
                </Typography>
                <Typography gutterBottom sx={{ float: "right" }}>
                    Status: {requestInfo?.status}
                </Typography>
            </Card>
        </Box>
    );
};

export default EnrollmentCard;
