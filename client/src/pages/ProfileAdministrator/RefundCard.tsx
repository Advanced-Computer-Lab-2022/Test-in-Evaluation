import { CardContent, Card, Typography, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { apiURL } from "../../App";
import { Toast } from "../../components";

const RefundCard = ({ refundRequest, getRefundRequests }: any) => {
    const [alert, setAlert] = React.useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post(
                apiURL + "/accept_refund",
                { enrollmentId: refundRequest._id },
                { withCredentials: true }
            );
            setAlert({
                isSuccess: true,
                isError: false,
                message: "Refund approved",
            });
            getRefundRequests();
        } catch (error) {
            console.log(error);
            setAlert({
                isSuccess: false,
                isError: true,
                message: "Error approving refund",
            });
        }
    };
    return (
        <Card>
            <Toast alert={alert} setAlert={setAlert} />
            <CardContent component="form" onSubmit={onSubmit}>
                <Typography variant="h6">
                    Student: {refundRequest?.studentId?.firstName}
                </Typography>
                <Typography variant="h6">
                    Course: {refundRequest?.courseId?.title}
                </Typography>
                <Typography variant="h6">
                    Amount: {refundRequest?.amountPaid}
                </Typography>
                <Typography variant="h6">
                    Date: {refundRequest?.paymentDate}
                </Typography>
                <Button type="submit" variant="contained">
                    Approve
                </Button>
            </CardContent>
        </Card>
    );
};

export default RefundCard;
