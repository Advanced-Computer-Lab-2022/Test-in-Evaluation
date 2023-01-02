import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../App";
import { Loader, Toast } from "../../components";
import RefundCard from "./RefundCard";
const Refunds = () => {
    const [refundRequests, setRefundRequests] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const getRefundRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                apiURL + "/get_pending_refunds",

                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            setRefundRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setAlert({
                isSuccess: false,
                isError: true,
                message: "Error fetching refund requests",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        getRefundRequests();
    }, []);
    if (loading) return <Loader open={loading} />;

    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, 20rem)",
                    gap: "1rem",
                }}
            >
                {refundRequests.map((refundRequest: any) => {
                    return (
                        <RefundCard
                            key={refundRequest._id}
                            refundRequest={refundRequest}
                            setRefundRequests={setRefundRequests}
                        />
                    );
                })}
            </Box>
        </>
    );
};

export default Refunds;
