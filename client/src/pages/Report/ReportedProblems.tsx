import { apiURL } from "../../App";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";
import { Box, Typography } from "@mui/material";
import ProblemCard from "./ProblemCard";
const ReportedProblems = () => {
    const [problems, setProblems] = useState([]);
    const [alert, setAlert] = useState({
        isSuccess: false,
        isError: false,
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const getReportedProblems = async () => {
        try {
            setLoading(true);
            const res = await axios.get(apiURL + "/get_all_reported_problems");
            setProblems(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setAlert({
                isSuccess: false,
                isError: true,
                message:
                    ((error as AxiosError)?.response?.data as string) ||
                    error?.toString() ||
                    "Server Error Please Try Again Later",
            });
        }
    };
    useEffect(() => {
        getReportedProblems();
    }, []);
    if (loading) return <Loader open={loading} />;
    return (
        <>
            <Toast alert={alert} setAlert={setAlert} />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(20rem,1fr))",
                    gap: "1rem",
                }}
            >
                {problems.map((problem) => {
                    return <ProblemCard problem={problem} />;
                })}
            </Box>
        </>
    );
};

export default ReportedProblems;
